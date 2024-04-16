import { createContext } from 'react'

export type StatusUnpin = 'none' | 'pending'
type NftsPageContextProps = {
  handleRefreshList: () => void
  // UNPIN
  handleUnpinNft: (nftId: string) => void
  handleOpenUnpinModal: (nftId: string) => void
  setStatusUnpin: (status: StatusUnpin) => void
  statusUnpin: StatusUnpin

  // PIN WITH FILES
  handleOpenUpload: () => void
  handleCloseUpload: () => void

  // PIN BY CID
  handleOpenUploadByCid: () => void
  handleCloseUploadByCid: () => void
}
export const NftsPageContext = createContext<NftsPageContextProps>({
  handleRefreshList: () => {},
  handleUnpinNft: () => {},
  handleOpenUnpinModal: () => {},
  setStatusUnpin: () => {},
  statusUnpin: 'none',

  // PIN WITH FILES
  handleOpenUpload: () => {},
  handleCloseUpload: () => {},

  // PIN BY CID
  handleOpenUploadByCid: () => {},
  handleCloseUploadByCid: () => {},
})
