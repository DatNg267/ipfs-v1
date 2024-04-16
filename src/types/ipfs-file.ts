import { array, boolean, number, object, string, z } from 'zod'
export const metaDataSchema = object({
  keyvalues: object({
    key: string().nullable().default(''),
    value: string().nullable().default(''),
  })
    .nullable()
    .default({}),
  name: string(),
  type: string(),
})
export const ipfsFileSchema = object({
  id: string(),
  file_record_id: string(),
  root_hash: string(),
  cid: string(),
  size: number().default(0),
  user_id: string(),
  created_at: string(),
  updated_at: string(),
  date_pinned: string(),
  date_unpinned: string(),
  pinned: boolean(),
  sub_hash_status: string(),
  is_dir: boolean(),
  metadata: metaDataSchema,
  status: string(),
})
export const ipfsFilesSchema = array(ipfsFileSchema.nullable()).nullable()

export type IpfsFile = z.infer<typeof ipfsFileSchema>
export type IpfsFiles = z.infer<typeof ipfsFilesSchema>
export type Metadata = z.infer<typeof metaDataSchema>
