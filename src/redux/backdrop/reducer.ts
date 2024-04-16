import { createSlice, nanoid } from '@reduxjs/toolkit'

export interface ModalState {
  open: boolean
}
const initialState: ModalState = {
  open: false,
}
const backdropSlice = createSlice({
  name: 'backdrop',
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

export const backdropActions = backdropSlice.actions
export const backdropReducer = backdropSlice.reducer
