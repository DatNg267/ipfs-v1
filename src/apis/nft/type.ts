import { Nft, Nfts } from '@/types/nfts'
import { PinnedStatus } from '../pinning/type'
import { SortOrder } from '@/types'

// Common
export type Metadata = {
  name: string
  description: string
}
export type PinFileOptions = {
  cid_version: number
  wrap_with_directory: boolean
  hostNodes: string[]
}
// Get nft by ID

export type GetNftByIdRequest = {
  nftId: string
}
export type GetNftByIdResponse = {
  status: string
  data: Nft
}
// Get all nft
export type SortByNft = 'created_at' | 'size' | 'name'
export type GetNftsRequest = {
  offset?: number
  limit?: number
  pinned?: PinnedStatus
  sortBy?: SortByNft
  sortOrder?: SortOrder
}

export type GetNftsResponse = {
  status: string
  data: {
    totals: any
    nfts: Nfts
  }
}
// Pinning nft file or folder
export type PinNftRequest = {
  metadata: File | Blob
  file: File | Blob
  options?: PinFileOptions
  cid?: string
}
interface MetadataAsset {
  name: string
  type: string
}
export type PinNftReponse = {
  data: Nft
  status: string
}

// Unpin
export type UnpinNftRequest = {
  nftId: string
}
export type UnpinNftReponse = {}

export type PinNftByCidRequest = {
  cid: string
  pinOptions: PinFileOptions
}
export type PinNftByCidReponse = {
  data: Nft
  status: string
}
