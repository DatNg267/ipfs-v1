import { axiosAuthorized } from '../_axiosAuth'
import {
  CreateApiKeyRequest,
  GetApiKeysReponse,
  GetApiKeysRequest,
  DeleteApiKeyRequest,
  DeleteApiKeyReponse,
  CreateApiKeyReponse,
} from './type'

export const apiKeysApi = {
  // [GET]
  getAll: ({
    offset = 0,
    limit = 10,
  }: GetApiKeysRequest): Promise<GetApiKeysReponse> => {
    return axiosAuthorized
      .get('/apiKeys/list', {
        params: {
          offset,
          limit,
        },
      })
      .then((response) => {
        return response.data
      })
  },

  // [POST]

  create: ({
    name,
    scopes,
  }: CreateApiKeyRequest): Promise<CreateApiKeyReponse> => {
    return axiosAuthorized
      .post('/apiKeys/', {
        name,
        scopes,
      })
      .then((response) => {
        return response.data
      })
  },
  // [DELETE]

  revoke: ({ id }: DeleteApiKeyRequest): Promise<DeleteApiKeyReponse> => {
    return axiosAuthorized.delete(`/apiKeys/${id}`).then((response) => {
      return response.data
    })
  },
}
