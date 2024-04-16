import { array, boolean, number, object, string, z } from 'zod'

export const gatewaySchema = object({
  name: string(),
  host: string(),
  type: string(),
  bandwidth: number(),
  operation: string(),
  active: boolean(),
})
export const gatewaysSchema = array(gatewaySchema.nullable()).nullable()

export type Gateway = z.infer<typeof gatewaySchema>
export type Gateways = z.infer<typeof gatewaysSchema>
