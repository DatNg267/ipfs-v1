import { IpfsFile, Metadata } from '@/types/ipfs-file'
import { Nft } from '@/types/nfts'

export type NftRow = Omit<Nft, 'metadata'> &
  Pick<Metadata, 'name' | 'type'> & {
    status_pinned: 'Pinned' | 'Unpinned' | 'Pending' | 'Failed'
    action: any
  }
