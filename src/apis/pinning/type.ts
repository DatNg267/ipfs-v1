import { SortOrder } from '@/types'
import { IpfsFile, IpfsFiles } from '@/types/ipfs-file'
// TYPES
export type Metadata = {
  name: string
  description: string
}
export type PinFileOptions = {
  cid_version: number
  wrap_with_directory: boolean
  hostNodes: string[]
}
export type PinnedStatus = 'all' | 'true' | 'false'
// GET
export type SortByIpfsFile = 'created_at' | 'size' | 'name'

export type GetIpfsFilesRequest = {
  offset?: number
  limit?: number
  pinned?: PinnedStatus
  sortBy?: SortByIpfsFile
  sortOrder?: SortOrder
}

export type GetIpfsFilesReponse = {
  status: string
  data: {
    totals: {
      files: number
      size: number
    }
    pins: IpfsFiles
  }
}

// CREATE
export type CreateIpfsFileRequest = {
  metadata: {
    name?: string
  }
  files: File[]
}
export type CreateIpfsFileReponse = {
  status: string
  data: IpfsFile
}
// DELETE
export type DeleteIpfsFileRequest = {
  pinId: string
}
export type DeleteIpfsFileReponse = {
  status: string
  data: {}
}

// PIN BY CID
export type PinFileByCidRequest = {
  payload: {
    hash_to_pin: string
    metadata: Metadata
  }
  pinOptions: PinFileOptions
}
export type PinFileByCidReponse = {
  status: string
  data: {
    api_key: string
    name: string
    secret_key: string
  }
}

export type GetFileRequest = {
  pinId: string
}
export type GetFileReponse = {
  status: string
  data: IpfsFile | null
}

// EDIT METADATA
export type EditMetadataFilesRequest = {
  id: string
  metadata: {
    keyvalues: { [key: string]: any }
    name: string
    type: string
  }
}
export type EditMetadataFilesReponse = {
  status: string
  [key: string]: any
}
