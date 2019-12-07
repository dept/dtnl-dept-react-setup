import fetch from 'isomorphic-fetch'
import qs from 'qs'

export interface HttpErrorInput {
  message: string
  statusCode: number
  response?: Response
  body?: any
}

export class HttpError extends Error {
  statusCode: number
  response?: Response
  body?: any

  constructor(input: HttpErrorInput) {
    super(input.message)
    this.response = input.response
    this.statusCode = input.statusCode
    this.body = input.body
    this.name = 'HttpError'
  }
}

type AbortFunction = () => void
type Token = string | undefined
type RequestFn = <T = any, I = any>(url: string, data: I, config?: RequestConfig) => Promise<T>
type RequestGetFn = <T = any, I = any>(url: string, data?: I, config?: RequestConfig) => Promise<T>
type UnauthenticatedHandler = <T = any>(requestFn: Promise<T>) => any
type RequestConfig = RequestInit & {
  baseUrl?: string
  token?: Token
  returnType?: 'json' | 'text' | 'blob'
  createAbort?: (abortFunction: AbortFunction | undefined) => void
  onUnauthenticated?: UnauthenticatedHandler
}

export class HttpClient {
  private defaultConfig: RequestConfig = {
    returnType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  private config: RequestConfig = {}

  constructor(config: RequestConfig = {}) {
    this.config = {
      ...this.defaultConfig,
      ...config,
    }
  }

  private createRequest(method: 'GET'): RequestGetFn
  private createRequest(method: string): RequestFn
  private createRequest(method: 'GET' | string): RequestFn {
    const fn: RequestFn = (url, data, config) => {
      if (method === 'GET') {
        let getUrl = url
        if (data) {
          getUrl = url + '?' + qs.stringify(data)
        }

        return this.request(getUrl, {
          ...config,
          method: 'GET',
        })
      } else {
        return this.request(url, {
          ...config,
          method,
          body: JSON.stringify(data),
        })
      }
    }

    return fn
  }

  public get = this.createRequest('GET')
  public post = this.createRequest('POST')
  public put = this.createRequest('PUT')
  public patch = this.createRequest('PATCH')
  public delete: RequestFn = this.createRequest('DELETE')

  private setAuthenticationHeaders(config: RequestConfig) {
    const { token } = config

    // if authenticated set bearer token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  public setToken = (token: Token) => (this.config.token = token)

  public setUnauthenticatedHandler = (handler: UnauthenticatedHandler) =>
    (this.config.onUnauthenticated = handler)

  private setAbortController = (config: RequestConfig) => {
    const { createAbort } = config
    if (createAbort) {
      if (typeof AbortController !== undefined) {
        const controller = new AbortController()
        const { signal } = controller
        config.signal = signal
        createAbort(controller.abort.bind(controller))
      }
    }
  }

  public request<T>(url: string, requestConfig: RequestConfig = {}): Promise<T> {
    const config: RequestConfig = {
      ...this.config,
      ...requestConfig,
    }

    const { baseUrl = '' } = config

    this.setAuthenticationHeaders(config)
    this.setAbortController(config)

    const requestFn = fetch(baseUrl + url, config)
      .then(this.handleError)
      .then(res => this.handleSuccess(res, config)) as Promise<T>

    return requestFn.catch(err => this.handleUnauthenticated<T>(err, requestFn))
  }

  private handleSuccess(res: Response, config: RequestConfig) {
    const { returnType = 'json' } = config

    if (res.status === 204 || res.status === 201) {
      return res
    }

    return res[returnType]()
  }

  private handleUnauthenticated<T = any>(err: HttpError, requestFn: Promise<T>) {
    const { onUnauthenticated } = this.config

    if (err instanceof HttpError) {
      if (err.statusCode === 401 && onUnauthenticated) {
        return onUnauthenticated(requestFn)
      }
    }

    throw err
  }

  private async handleError(response: Response) {
    if (response.ok) {
      return response
    }

    const responseBody = await response.text()
    let body: any = response

    try {
      body = JSON.parse(responseBody)
    } catch {
      body = responseBody
    }

    const error = {
      message: `HttpError: ${response.status} - ${response.statusText}`,
      statusCode: response.status,
      response,
      body,
    }

    console.error(error)
    throw new HttpError(error)
  }
}
