import { array, boolean, number, object, string, z } from 'zod'
export const metaDataSchema = object({
  name: string(),
  type: string(),
})
export const nftSchema = object({
  id: string(),
  asset_cid: string(),
  metadata_cid: string(),
  asset_pin_id: string(),
  metadata_pin_id: string(),
  size: number(),
  user_id: string(),
  created_at: string(),
  updated_at: string(),
  pinned: boolean(),
  metadata_asset: metaDataSchema,
  status: string(),
})
export const nftsSchema = array(nftSchema.nullable()).nullable()

export type Nft = z.infer<typeof nftSchema>
export type Nfts = z.infer<typeof nftsSchema>
export type Metadata = z.infer<typeof metaDataSchema>
