import fetch from 'isomorphic-fetch'
import qs from 'qs'

import { HttpError } from './Errors'

class HttpService {
  private defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  public get = <T = any, I = any>(url: string, params?: I, config?: RequestInit) => {
    let getUrl = url
    if (params) {
      getUrl = url + '?' + qs.stringify(params)
    }

    return this.request<T>('GET', getUrl, config)
  }
  public post = <T = any, I = any>(url: string, data: I, config?: RequestInit) =>
    this.request<T>('POST', url, {
      body: JSON.stringify(data),
      ...config,
    })
  public put = <T = any, I = any>(url: string, data: I, config?: RequestInit) =>
    this.request<T>('PUT', url, {
      body: JSON.stringify(data),
      ...config,
    })
  public delete = <T = any, I = any>(url: string, data?: I, config?: RequestInit) =>
    this.request<T>('DELETE', url, {
      body: JSON.stringify(data),
      ...config,
    })

  public setAuthenticationHeaders(options: RequestInit) {
    // if authenticated set bearer token
    return options
  }

  private request<T>(method: string, url: string, opts: RequestInit = {}): Promise<T> {
    const options: RequestInit = {
      method,
      ...this.defaultOptions,
      ...opts,
    }

    this.setAuthenticationHeaders(options)

    return fetch(url, options)
      .then(this.handleErrors)
      .then(res => res.json())
      .catch((err: HttpError) => {
        throw err
      })
  }

  private async handleErrors(response: Response) {
    if (!response.ok) {
      if (response.status === 401) {
        // logout
      }

      const responseBody = await response.text()
      let body: any = response

      try {
        body = JSON.parse(responseBody)
      } catch {
        body = responseBody
      }

      throw new HttpError({
        message: response.statusText,
        status: response.status,
        response,
        body,
      })
    }
    return response
  }
}

export const Http = new HttpService()
