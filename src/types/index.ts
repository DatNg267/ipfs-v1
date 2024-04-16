import { number, object, z } from 'zod'

export type AppActionResponseSuccess<T> = {
  status: AppActionResponseStatus
  data: T
}
export type AppActionResponseError = {
  status: AppActionResponseStatus
  errorMessage: string
}
export enum AppActionResponseStatus {
  SUCCESS,
  ERROR,
}
export enum LocalStorageKey {
  ACCESS_TOKEN = 'aioz_ipfs_access_token',
  REFRESH_TOKEN = 'aioz_ipfs_refresh_token',
}

export type AppStatusAction = 'pending' | 'success' | 'fail' | null

export const nativeTokenSchema = object({
  total_supply: number().nullish().catch(null).default(null),
  circulating_supply: number().nullish().catch(null).default(null),
  fully_diluted_valuation: number().nullish().catch(null).default(null),
  current_price: number().nullish().catch(null).default(null),
  volume_24_h: number().nullish().catch(null).default(null),
  market_cap: number().nullish().catch(null).default(null),
  rank: number().nullish().catch(null).default(null),
  high_24_h: number().nullish().catch(null).default(null),
  low_24_h: number().nullish().catch(null).default(null),
  last_updated: number().nullish().catch(null).default(null),
  change_percentage_24h: number().nullish().catch(null).default(null),
})

export type NativeToken = z.infer<typeof nativeTokenSchema>
export type NativeTokenResponse = {
  status: string
  data: NativeToken | null
  total: number
}

export type FetchDataStatus = 'Fetching' | 'Fetched' | 'Failed' | null

export type SortOrder = 'ASC' | 'DESC'
