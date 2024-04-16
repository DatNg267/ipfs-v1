import { ApiKeys } from '@/types/api-key'

export type GetApiKeysRequest = {
  offset?: number // Default 0
  limit?: number // Default 10
}
export type GetApiKeysReponse = {
  status: string
  data: {
    total: number
    api_keys: ApiKeys
  }
}

export type CreateApiKeyRequest = {
  name: string
  scopes: {
    admin: boolean
    data: {
      nft_list: boolean
      pin_list: boolean
    }
    pinning: {
      pin_by_hash: boolean
      pin_file_to_ipfs: boolean
      unpin: boolean
    }
    pin_nft: {
      unpin_nft: boolean
      pin_nft_to_ipfs: boolean
    }
  }
}
export type CreateApiKeyReponse = {
  status: string
  data: {
    api_key: string
    name: string
    secret_key: string
  }
}

export type DeleteApiKeyRequest = {
  id: string
}
export type DeleteApiKeyReponse = {
  status: string
  data: {}
}
