import { bool } from 'yup'
import { object, string, number, date, boolean, array, infer, z } from 'zod'

export const apiKeySchema = object({
  id: string(),
  name: string(),
  api_key: string(),
  secret_key: string(),
  created_at: string(),
  scopes: object({
    data: object({
      pin_list: boolean(),
    }),
    pinning: object({
      unpin: boolean(),
      pin_by_hash: boolean(),
      pin_file_to_ipfs: boolean(),
    }),
  }),
})
export const apiKeysSchema = array(apiKeySchema.nullable()).nullable()

export type ApiKey = z.infer<typeof apiKeySchema>
export type ApiKeys = z.infer<typeof apiKeysSchema>
