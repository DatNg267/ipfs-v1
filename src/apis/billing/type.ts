import { HistoryUsages, ThisMonthUsage, TopUpUsages } from '@/types/billing'

export type GetHistoryUsagesRequest = {
  offset: number
  limit: number
}
export type GetHistoryUsagesResponse = {
  status: string
  data: {
    total_days: number
    history_usages: HistoryUsages
  }
}
export type GetThisMonthUsageRequest = {}
export type GetThisMonthUsageResponse = {
  status: string
  data: ThisMonthUsage
}
export type GetTopUpUsagesRequest = {
  offset: number
  limit: number
}
export type GetTopUpUsagesResponse = {
  status: string
  data: {
    totals: number
    top_up_usages: TopUpUsages
  }
}
