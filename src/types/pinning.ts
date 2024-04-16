import { array, number, object, string, z } from 'zod'

export const pinningFileSchema = object({
  id: string(),
  email: string(),
  first_name: string(),
  last_name: string(),
  provider: string(),
  role: string(),
  updated_at: number(),
  wallet_address: string(),
})
export const pinningFilesSchema = array(pinningFileSchema.nullable()).nullable()

export type PinningFile = z.infer<typeof pinningFileSchema>
export type PinningFiles = z.infer<typeof pinningFilesSchema>

export type GetPinningFilesReponse = {
  status: string
  data: {
    total: number
    files: PinningFiles
  }
}
