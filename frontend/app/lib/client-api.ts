import { Api } from '@/lib/api'
import useSWR, { SWRResponse } from 'swr'

/**
 * Hook-enabled API for use on client-side pages.
 */
export class ClientApi extends Api {
  public useItems(): SWRResponse<string[]> {
    return useSWR<string[]>('/items', this.get.bind(this))
  }
}
