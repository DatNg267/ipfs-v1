import { IPFSGetFolderResponse } from '@/apis/ipfs/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ModalReviewFolderState {
  folder: null | IPFSGetFolderResponse
  indexFileTarget: number
  isReviewFileDataTab: boolean
  size: number
  name: string
  cid: string
}
const initialState: ModalReviewFolderState = {
  folder: null,
  indexFileTarget: 0,
  isReviewFileDataTab: false,
  size: 0,
  name: '',
  cid: '',
}
const modalReviewFolderSlice = createSlice({
  name: 'modalReviewFolder',
  initialState,
  reducers: {
    updateFolderInfo(
      state,
      action: PayloadAction<
        Pick<ModalReviewFolderState, 'cid' | 'name' | 'size'>
      >
    ) {
      state.cid = action.payload.cid
      state.name = action.payload.name
      state.size = action.payload.size
    },
    setFolder(state, action: PayloadAction<ModalReviewFolderState['folder']>) {
      state.folder = action.payload
    },
    setIndexFileTarget(
      state,
      action: PayloadAction<ModalReviewFolderState['indexFileTarget']>
    ) {
      state.indexFileTarget = action.payload
    },
    setIsReviewFileDataTab(
      state,
      action: PayloadAction<ModalReviewFolderState['isReviewFileDataTab']>
    ) {
      state.isReviewFileDataTab = action.payload
    },
    reset(state) {
      state.folder = initialState.folder
      state.indexFileTarget = initialState.indexFileTarget
      state.isReviewFileDataTab = initialState.isReviewFileDataTab
    },
  },
})

export const modalReviewFolderActions = modalReviewFolderSlice.actions
export const modalReviewFolderReducer = modalReviewFolderSlice.reducer
