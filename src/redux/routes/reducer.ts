import { createSlice, nanoid } from '@reduxjs/toolkit'

export type RouterStatus = 'init' | 'pending' | 'error' | 'success'
export type RouterState = {
  status: RouterStatus
}
const initialState: RouterState = {
  status: 'init',
}
const RouterSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload
    },
  },
})

export const { setStatus } = RouterSlice.actions
export const RouterReducer = RouterSlice.reducer
