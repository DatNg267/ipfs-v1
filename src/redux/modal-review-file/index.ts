import { IPFSGetFolderResponse } from '@/apis/ipfs/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ModalReviewFileState {
  size: number
  name: string
  cid: string
}
const initialState: ModalReviewFileState = {
  size: 0,
  name: '',
  cid: '',
}
const modalReviewFileSlice = createSlice({
  name: 'modalReviewFile',
  initialState,
  reducers: {
    updateFileInfo(
      state,
      action: PayloadAction<Pick<ModalReviewFileState, 'cid' | 'name' | 'size'>>
    ) {
      state.cid = action.payload.cid
      state.name = action.payload.name
      state.size = action.payload.size
    },
  },
})

export const modalReviewFileActions = modalReviewFileSlice.actions
export const modalReviewFileReducer = modalReviewFileSlice.reducer
