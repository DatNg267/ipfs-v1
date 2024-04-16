import { authApis } from '@/apis/auth'
import { GetBalanceResponse } from '@/apis/auth/type'
import { billingApis } from '@/apis/billing'
import {
  GetHistoryUsagesRequest,
  GetHistoryUsagesResponse,
  GetThisMonthUsageRequest,
  GetThisMonthUsageResponse,
  GetTopUpUsagesRequest,
  GetTopUpUsagesResponse,
} from '@/apis/billing/type'
import { useWrapperFunctionTokenExpired } from '@/services'
export const useGetBalance = (): (({}) => Promise<GetBalanceResponse>) => {
  const func = ({}) => {
    return authApis.getBalance()
  }
  return useWrapperFunctionTokenExpired(func)
}
export const useGetThisMonthUsages =
  (): (({}: GetThisMonthUsageRequest) => Promise<GetThisMonthUsageResponse>) => {
    const func = ({}: GetThisMonthUsageRequest) => {
      return billingApis.getThisMonthUsage({})
    }
    return useWrapperFunctionTokenExpired(func)
  }

export const useGetHistoryUsages = (): (({
  limit,
  offset,
}: GetHistoryUsagesRequest) => Promise<GetHistoryUsagesResponse>) => {
  const func = ({ limit, offset }: GetHistoryUsagesRequest) => {
    return billingApis.getHistoryUsages({ limit, offset })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useGetTopUpUsages = (): (({
  offset,
  limit,
}: GetTopUpUsagesRequest) => Promise<GetTopUpUsagesResponse>) => {
  const func = ({ limit, offset }: GetHistoryUsagesRequest) => {
    return billingApis.getTopUpUsages({ limit, offset })
  }
  return useWrapperFunctionTokenExpired(func)
}
