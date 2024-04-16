import { axiosAuthorized } from '../_axiosAuth'
import {
  GetHistoryUsagesRequest,
  GetHistoryUsagesResponse,
  GetThisMonthUsageRequest,
  GetThisMonthUsageResponse,
  GetTopUpUsagesRequest,
  GetTopUpUsagesResponse,
} from './type'

const BaseUrl = '/billing/'
export const billingApis = {
  //[GET]
  getHistoryUsages: ({
    offset,
    limit,
  }: GetHistoryUsagesRequest): Promise<GetHistoryUsagesResponse> => {
    return axiosAuthorized
      .get(BaseUrl + 'historyUsage/', {
        params: {
          offset,
          limit,
        },
      })
      .then((response) => response.data)
  },
  getThisMonthUsage:
    ({}: GetThisMonthUsageRequest): Promise<GetThisMonthUsageResponse> => {
      return axiosAuthorized
        .get(BaseUrl + 'thisMonthUsage/')
        .then((response) => response.data)
    },
  getTopUpUsages: ({
    offset,
    limit,
  }: GetTopUpUsagesRequest): Promise<GetTopUpUsagesResponse> => {
    return axiosAuthorized
      .get(BaseUrl + 'topUp/', {
        params: {
          offset,
          limit,
        },
      })
      .then((response) => response.data)
  },
}
