import { createSlice } from '@reduxjs/toolkit'

export type ModalDownloadProgress = {
  open: boolean | null
}
const initialState: ModalDownloadProgress = {
  open: false,
}

const modalDownloadProgressSlice = createSlice({
  name: 'modalDownloadProgress',
  initialState,
  reducers: {
    open(state) {
      state.open = true
    },
    close(state) {
      state.open = false
    },
  },
})

export const modalDownloadProgressActions = modalDownloadProgressSlice.actions
export const modalDownloadProgressReducer = modalDownloadProgressSlice.reducer
