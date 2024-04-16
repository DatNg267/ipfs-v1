import { object, string, number, date, boolean, array, infer, z } from 'zod'

export const userSchema = object({
  id: string(),
  email: string(),
  first_name: string(),
  last_name: string(),
  provider: string(),
  role: string(),
  updated_at: number(),
  wallet_address: string(),
})
export type User = z.infer<typeof userSchema>

export const responseLoginSchema = object({
  access_token: string(),
  refresh_token: string(),
  token_type: string(),
})
export type ResponseLogin = z.infer<typeof responseLoginSchema>

export const balanceSchema = object({
  wallet_address: string(),
  balance: string(),
  is_low_balance: boolean(),
})

export type Balance = z.infer<typeof balanceSchema>
