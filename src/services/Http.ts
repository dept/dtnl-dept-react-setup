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

export type AbortFunction = () => void
type Token = string | undefined
type RequestFn = <T = any, I = any>(url: string, data: I, config?: RequestConfig) => Promise<T>
type RequestGetFn = <T = any, I = any>(url: string, data?: I, config?: RequestConfig) => Promise<T>
type UnauthenticatedHandler = <T = any>(requestFn: Promise<T>) => any
type BeforeHook = (client: HttpClient) => Promise<void> | void
type ErrorHook = <T = any>(err: HttpError, request: Promise<T>) => any
type HttpClientInit = RequestInit & {
  baseUrl?: string
  returnType?: 'json' | 'text' | 'blob'
  beforeHook?: BeforeHook
  onError?: ErrorHook
  onUnauthenticated?: UnauthenticatedHandler
}
type RequestConfig = HttpClientInit & {
  createAbort?: (abortFunction: AbortFunction) => void
}

/**
 * Wrapper around fetch
 */
export class HttpClient {
  private defaultConfig: RequestConfig = {
    returnType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  private config: RequestConfig = {}
  private token: Token

  constructor(config: HttpClientInit = {}) {
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
        const isFormData =
          (config?.headers as any)['Content-type'] === 'application/x-www-form-urlencoded'

        return this.request(url, {
          ...config,
          method,
          body: isFormData ? qs.stringify(data) : JSON.stringify(data),
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
    // if authenticated set bearer token
    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      }
    }
  }

  public setToken = (token: Token) => (this.token = token)

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
      } else {
        createAbort(() => console.log('The AbortController api isnt available in your browser'))
      }
    }
  }

  public async request<T>(url: string, requestConfig: RequestConfig = {}): Promise<T> {
    const { beforeHook } = this.config

    const config: RequestConfig = {
      ...this.config,
      ...requestConfig,
    }

    const { baseUrl = '' } = config

    this.setAbortController(config)

    if (beforeHook) {
      await beforeHook(this)
    }

    this.setAuthenticationHeaders(config)

    const requestFn = fetch(baseUrl + url, config)
      .then(this.handleError)
      .then(res => this.handleSuccess(res, config)) as Promise<T>

    return requestFn.catch(err => this.onError<T>(err, requestFn))
  }

  private handleSuccess(res: Response, config: RequestConfig) {
    const { returnType = 'json' } = config

    if (res.status === 204 || res.status === 201) {
      return res
    }

    return res[returnType]()
  }

  private async onError<T = any>(err: HttpError, requestFn: Promise<T>) {
    const { onError } = this.config

    if (onError) {
      return onError(err, requestFn)
    }

    throw err
  }

  /**
   * Handles the errors if the fetch request fails and throws a HttpError
   * @param response
   */
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
