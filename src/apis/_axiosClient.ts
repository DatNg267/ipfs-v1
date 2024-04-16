import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { BaseURL } from '.'

export const axiosClient = axios.create({
  baseURL: BaseURL,
})

const onRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
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
setupInterceptorsTo(axiosClient)
