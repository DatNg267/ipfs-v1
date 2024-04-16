import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type DownloadStatus = 'done' | 'fail' | 'pending' | 'canceled' | null
export type DownloadType = 'file' | 'folder'

export type Download = {
  totalSize: number
  sizeDownloaded: number
  status: DownloadStatus
  name: string
  abortController: AbortController | null
  type: DownloadType
}
export type DownloadState = {
  data: {
    [key: string]: Download
  }
}
const initialState: DownloadState = {
  data: {},
}
const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    initState(state, action: PayloadAction<string>) {
      let newValues: Download = {
        totalSize: 0,
        sizeDownloaded: 0,
        status: null,
        name: '',
        abortController: null,
        type: 'file',
      }
      state.data[action.payload] = newValues
    },
    setInitData(
      state,
      action: PayloadAction<{
        id: string
        totalSize: Download['totalSize']
        name: Download['name']
        type: DownloadType
      }>
    ) {
      state.data[action.payload.id].totalSize = action.payload.totalSize
      state.data[action.payload.id].name = action.payload.name
      state.data[action.payload.id].type = action.payload.type
    },
    setTotalSize(
      state,
      action: PayloadAction<{ id: string; totalSize: number }>
    ) {
      state.data[action.payload.id].totalSize = action.payload.totalSize
    },
    updateController(
      state,
      action: PayloadAction<{
        id: string
        abortController: Download['abortController']
      }>
    ) {
      state.data[action.payload.id].abortController =
        action.payload.abortController
    },

    updateSizeDownloaded(
      state,
      action: PayloadAction<{
        id: string
        sizeDownloaded: number
      }>
    ) {
      state.data[action.payload.id].sizeDownloaded +=
        action.payload.sizeDownloaded
    },
    updateStatus(
      state,
      action: PayloadAction<{
        id: string
        status: DownloadStatus
      }>
    ) {
      state.data[action.payload.id].status = action.payload.status
    },
    done(state, action: PayloadAction<string>) {
      state.data[action.payload].status = 'done'
      state.data[action.payload].sizeDownloaded =
        state.data[action.payload].totalSize
    },
    reset(state, action: PayloadAction<string>) {
      state.data[action.payload].sizeDownloaded = 0
      state.data[action.payload].totalSize = 0
      state.data[action.payload].status = null
      state.data[action.payload].name = ''
    },
    resetAll(state) {
      state.data = {}
    },
  },
})

export const downloadActions = downloadSlice.actions
export const downloadReducer = downloadSlice.reducer
