import { apiKeysApi } from '@/apis/api-keys'
import {
  CreateApiKeyReponse,
  CreateApiKeyRequest,
  DeleteApiKeyReponse,
  DeleteApiKeyRequest,
  GetApiKeysReponse,
  GetApiKeysRequest,
} from '@/apis/api-keys/type'
import { useWrapperFunctionTokenExpired } from '@/services'
import { UserErrorMessage, getError } from '@/utils/error'
import { AxiosError } from 'axios'

export const useGetApiKeys = (): (({
  offset,
  limit,
}: GetApiKeysRequest) => Promise<GetApiKeysReponse>) => {
  const func = ({ offset, limit }: GetApiKeysRequest) => {
    return apiKeysApi.getAll({ offset, limit })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useCreateApiKey = (): (({
  name,
  scopes,
}: CreateApiKeyRequest) => Promise<CreateApiKeyReponse>) => {
  const func = ({ name, scopes }: CreateApiKeyRequest) => {
    return apiKeysApi
      .create({ name, scopes })
      .then((res) => res)
      .catch((err) => {
        const error = getError(err)
        if (
          error.type === 'axios' &&
          (error.originError as AxiosError).response?.status === 409 &&
          (error.originError as AxiosError).response?.statusText === 'Conflict'
        ) {
          throw new Error(UserErrorMessage.API_KEY_IS_EXISTS)
        } else {
          throw new Error(error.error.message)
        }
      })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useRevokeApiKey = (): (({
  id,
}: DeleteApiKeyRequest) => Promise<DeleteApiKeyReponse>) => {
  const func = ({ id }: DeleteApiKeyRequest) => {
    return apiKeysApi.revoke({ id })
  }
  return useWrapperFunctionTokenExpired(func)
}
