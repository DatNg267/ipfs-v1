import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { BaseURL } from '.'
import { LocalStorageKey } from '@/types'

export const axiosAuthorized = axios.create({
  baseURL: BaseURL,
})

const onRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const access_token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + access_token,
    } as AxiosRequestHeaders
  }
  return config
}
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
setupInterceptorsTo(axiosAuthorized)
