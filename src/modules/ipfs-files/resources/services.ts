import { FileStatus, StatusFiles } from './types'

export function getStatus(status: FileStatus | string) {
  switch (status) {
    case FileStatus.DONE: {
      return StatusFiles.PINNED
    }
    case FileStatus.FAILED: {
      return StatusFiles.FAILED
    }
    case FileStatus.PENDING: {
      return StatusFiles.PINNING
    }
    case FileStatus.PROCESSING: {
      return StatusFiles.PINNING
    }
    //
    case FileStatus.RETRIEVAL: {
      return StatusFiles.PINNING
    }
    case FileStatus.PROCESSING_RETRIEVAL: {
      return StatusFiles.PINNING
    }
    case FileStatus.DONE_RETRIEVAL: {
      return StatusFiles.PINNING
    }
    case FileStatus.FAILED_RETRIEVE: {
      return StatusFiles.FAILED
    }
    //
    case FileStatus.UNPINNORMALLY: {
      return StatusFiles.DELETED
    }
    case FileStatus.UNPINOUTOFMONEY: {
      return StatusFiles.DELETED
    }
    default:
      return StatusFiles.UNKNOWN
  }
}
