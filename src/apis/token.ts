import { UserErrorMessage } from '@/utils/error'
import { axiosClient } from './_axiosClient'
import { NativeToken, NativeTokenResponse } from '@/types'

export const NATIVE_TOKEN_URL = process.env.NEXT_PUBLIC_NATIVE_TOKEN_URL

export const getToken = (): Promise<NativeTokenResponse> => {
  if (!NATIVE_TOKEN_URL) throw new Error(UserErrorMessage.FETCHING_DATA_FAILED)
  return axiosClient.get(NATIVE_TOKEN_URL).then((res) => res.data)
}
