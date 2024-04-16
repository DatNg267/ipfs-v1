import { createSlice } from '@reduxjs/toolkit'

export type UploadWrapperAnimateLoading = {
  start: boolean | null
}
const initialState: UploadWrapperAnimateLoading = {
  start: false,
}

const uploadWrapperAnimateLoadingSlice = createSlice({
  name: 'uploadWrapperAnimateLoading',
  initialState,
  reducers: {
    start(state) {
      state.start = true
    },
    stop(state) {
      state.start = false
    },
  },
})

export const uploadWrapperAnimateLoadingActions =
  uploadWrapperAnimateLoadingSlice.actions
export const uploadWrapperAnimateLoadingReducer =
  uploadWrapperAnimateLoadingSlice.reducer
