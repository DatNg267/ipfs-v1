import { axiosAuthorized } from '../_axiosAuth'
import {
  EditMetadataFilesReponse,
  EditMetadataFilesRequest,
  GetFileReponse,
  GetFileRequest,
  PinFileByCidReponse,
  PinFileByCidRequest,
} from './type'
import {
  CreateIpfsFileRequest,
  GetIpfsFilesReponse,
  GetIpfsFilesRequest,
  DeleteIpfsFileRequest,
  DeleteIpfsFileReponse,
  CreateIpfsFileReponse,
} from './type'

export const ipfsFilesApi = {
  // [GET]
  getFile: ({ pinId }: GetFileRequest): Promise<GetFileReponse> => {
    return axiosAuthorized.get(`/pinning/${pinId}`).then((response) => {
      return response.data
    })
  },
  getAll: ({
    offset = 0,
    limit = 10,
    pinned,
    sortBy = 'created_at',
    sortOrder = 'DESC',
  }: GetIpfsFilesRequest): Promise<GetIpfsFilesReponse> => {
    return axiosAuthorized
      .get('/pinning/pins/', {
        params: {
          offset,
          limit,
          pinned,
          sortBy,
          sortOrder,
        },
      })
      .then((response) => {
        return response.data
      })
  },

  // [POST]
  pinByCid: ({
    payload,
    pinOptions,
  }: PinFileByCidRequest): Promise<PinFileByCidReponse> => {
    return axiosAuthorized
      .post('/pinning/pinByHash/', {
        ...payload,
        pinOptions,
      })
      .then((response) => {
        return response.data
      })
  },
  editMetadata: ({
    id,
    metadata,
  }: EditMetadataFilesRequest): Promise<EditMetadataFilesReponse> => {
    return axiosAuthorized
      .put('/pinning/metadata/', {
        id,
        metadata,
      })
      .then((response) => {
        return response.data
      })
  },

  // [DELETE]

  delete: ({
    pinId,
  }: DeleteIpfsFileRequest): Promise<DeleteIpfsFileReponse> => {
    return axiosAuthorized
      .delete(`/pinning/unpin/${pinId}`)
      .then((response) => {
        return response.data
      })
  },
}
