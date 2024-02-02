import { API_URL } from '@/lib/constants'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestArgs<T> {
  method: HttpMethod
  url: string
  data?: T
}

/**
 * Backend API client. Does not include any hooks, so it can be used in
 * server-side props for server-side rendererd pages.
 */
export class Api {
  constructor() {}

  protected async request<T, R>(args: RequestArgs<T>): Promise<R> {
    const { method, url, data } = args
    let opts: any = {
      method: method,
      cache: 'no-cache',
    }
    if (data) {
      opts = {
        ...opts,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'test',
        },
      }
    }
    const response = await fetch(url, opts)
    if (response.status >= 400) {
      throw response
    }
    if (response.headers.get('Content-Type') === 'application/json') {
      // @ts-ignore
      return await response.json()
    } else {
      // @ts-ignore
      return null
    }
  }

  protected get<T, R>(endpoint: string, data?: T): Promise<R> {
    const url = API_URL + endpoint
    return this.request({ method: 'GET', url, data })
  }

  protected post<T, R>(endpoint: string, data?: T): Promise<R> {
    const url = API_URL + endpoint
    return this.request({ method: 'POST', url, data })
  }
}
