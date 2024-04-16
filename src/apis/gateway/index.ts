import { axiosAuthorized } from '../_axiosAuth'
import {
  GetGatewaysByHashRequest,
  GetGatewaysByHashResponse,
  GetGatewaysRequest,
  GetGatewaysResponse,
  GetStatusSubcribeGatewaysRequest,
  GetStatusSubcribeGatewaysResponse,
  SubcribeGatewaysResponse,
  UnsubcribeGatewaysResponse,
} from './type'

const nftBaseUrl = '/dedicatedGateways/'
export const GatewayApis = {
  //[GET]
  getStatusSubcribe:
    ({}: GetStatusSubcribeGatewaysRequest): Promise<GetStatusSubcribeGatewaysResponse> => {
      return axiosAuthorized.get(nftBaseUrl).then((response) => response.data)
    },
  getGatewaysByHash:
    ({}: GetGatewaysByHashRequest): Promise<GetGatewaysByHashResponse> => {
      return axiosAuthorized.get(nftBaseUrl).then((response) => response.data)
    },
  getGateways: ({
    limit,
    offset,
    type = 'all',
  }: GetGatewaysRequest): Promise<GetGatewaysResponse> => {
    return axiosAuthorized
      .get('/gateways/', {
        params: {
          limit,
          offset,
          type,
        },
      })
      .then((response) => response.data)
  },
  subcribe: (): Promise<SubcribeGatewaysResponse> => {
    return axiosAuthorized.post(nftBaseUrl).then((response) => response.data)
  },
  unsubcribe: (): Promise<UnsubcribeGatewaysResponse> => {
    return axiosAuthorized.delete(nftBaseUrl).then((response) => response.data)
  },
}
