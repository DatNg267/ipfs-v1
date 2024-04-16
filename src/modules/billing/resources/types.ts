import { HistoryUsage, TopUpUsage } from '@/types/billing'

export type BillingTag = 'month-usage' | 'history-usage' | 'top-up'
export type HistoryUsageRowData = HistoryUsage & {
  storage_delivery: string
}

export type ThisMonthRowData = {
  resource: string
  usage: number
  cost: string
}

export type TopUpUsageRowData = TopUpUsage & {
  amount_string: string
}
