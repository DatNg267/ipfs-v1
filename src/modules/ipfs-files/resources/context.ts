import { createContext } from 'react'
import { StepUploadFile } from './types'
import { FetchDataStatus } from '@/types'
import { Metadata } from '@/types/ipfs-file'

export type StatusDelete = 'none' | 'deleting'
export type IpfsFilesPageContextProps = {
  handleRefreshList: () => void
  handleDeleteIpfsFile: (pinId: string) => void
  handleOpenDeleteModal: (pinId: string) => void
  handleOpenEditModal: (pinId: string, metadata: Metadata) => void
  handleCloseUploadFile: () => void
  setStatusDelete: (status: StatusDelete) => void
  step: StepUploadFile | null
  statusDelete: StatusDelete
  handleOpenStep: (stepName: StepUploadFile | null) => void
  fetchDataStatus: FetchDataStatus
  selectedItemEdit: { pinId: string; metadata: Metadata } | null
}

export const IpfsFilesPageContext = createContext<IpfsFilesPageContextProps>({
  handleRefreshList: () => {},
  handleDeleteIpfsFile: () => {},
  handleOpenDeleteModal: () => {},
  handleOpenEditModal: () => {},
  handleCloseUploadFile: () => {},
  setStatusDelete: () => {},
  step: null,
  statusDelete: 'none',
  handleOpenStep: () => {},
  fetchDataStatus: null,
  selectedItemEdit: null,
})
