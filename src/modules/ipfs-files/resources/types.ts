import { IpfsFile, Metadata } from '@/types/ipfs-file'

export enum FileStatus {
  RETRIEVAL = 'retrieval',
  PROCESSING_RETRIEVAL = 'processingRetrieval',
  DONE_RETRIEVAL = 'doneRetrieval',
  FAILED_RETRIEVE = 'retrieveFailed',

  PENDING = 'queued',
  PROCESSING = 'pinning',
  DONE = 'pinned',
  FAILED = 'failed',

  UNPINNORMALLY = 'unpinNormally',
  UNPINOUTOFMONEY = 'unpinOutOfMoney',
  GCDONE = 'gcDone',
}
export type StepUploadFile = 'Upload' | 'Result'

export enum StatusFiles {
  PINNED = 'Pinned',
  DELETED = 'Unpinned',
  PINNING = 'Pinning',
  FAILED = 'Failed',
  UNKNOWN = 'UNKNOWN',
}
export type IpfsFileRow = IpfsFile &
  Pick<Metadata, 'name' | 'type'> & {
    status_pinned: StatusFiles
    action: string
  }
