import fetch from 'isomorphic-fetch'
import qs from 'qs'

import { config } from '@/utils/config'

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

type RequestFn<T = any, I = any> = (url: string, data?: I, config?: RequestInit) => Promise<T>

class HttpService {
  private defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  private baseUrl = config.API_URL

  public get: RequestFn = (url, params, config) => {
    let getUrl = url
    if (params) {
      getUrl = url + '?' + qs.stringify(params)
    }

    return this.request(getUrl, {
      ...config,
      method: 'GET',
    })
  }

  public post: RequestFn = (url, data, config) =>
    this.request(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    })

  public put: RequestFn = (url, data, config) =>
    this.request(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    })

  public delete: RequestFn = (url, data, config) =>
    this.request(url, {
      ...config,
      method: 'DELETE',
      body: JSON.stringify(data),
    })

  public setAuthenticationHeaders(options: RequestInit) {
    // if authenticated set bearer token
    return options
  }

  public request<T>(url: string, opts: RequestInit = {}): Promise<T> {
    const options: RequestInit = {
      ...this.defaultOptions,
      ...opts,
    }

    this.setAuthenticationHeaders(options)

    if (!(url.includes('http://') || url.includes('https://'))) {
      url = this.baseUrl + url
    }

    return fetch(url, options)
      .then(this.handleErrors)
      .then(res => {
        if (res.status === 204 || res.status === 201) {
          return res
        }
        return res.json()
      })
  }

  private async handleErrors(response: Response) {
    if (response.ok) {
      return response
    }

    if (response.status === 401) {
      // User is not authenticated
      // logout
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

export const Http = new HttpService()
