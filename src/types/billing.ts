import { array, boolean, number, object, string, z } from 'zod'

export const historyUsageSchema = object({
  date: string(),
  total_storage: number().default(0),
  total_bandwidth: number().default(0),
  total_amount: string().default('0'),
})
export const historyUsagesSchema = array(
  historyUsageSchema.nullable()
).nullable()

export type HistoryUsage = z.infer<typeof historyUsageSchema>
export type HistoryUsages = z.infer<typeof historyUsagesSchema>

export const thisMonthUsageSchema = object({
  storage_usage: number(),
  total_storage: number(),
  bandwidth_usage: number(),
  storage_cost: string(),
  bandwidth_cost: string(),
})
export const thisMonthUsagesSchema = array(
  thisMonthUsageSchema.nullable()
).nullable()

export type ThisMonthUsage = z.infer<typeof thisMonthUsageSchema>
export type ThisMonthUsages = z.infer<typeof thisMonthUsageSchema>

export const topUpUsageSchema = object({
  evm_tx_hash: string(),
  cosmos_tx_hash: string(),
  id: string(),
  sender: string(),
  recipient: string(),
  amount: object({
    denom: string(),
    amount: string(),
  }),
  status: boolean(),
  credit: string(),
  created_at: string(),
  updated_at: string(),
})
export const topUpUsagesSchema = array(topUpUsageSchema.nullable()).nullable()

export type TopUpUsage = z.infer<typeof topUpUsageSchema>
export type TopUpUsages = z.infer<typeof topUpUsagesSchema>
