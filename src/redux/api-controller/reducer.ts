import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CancelTokenSource } from 'axios'

export type apiControllerState = {
  controller: CancelTokenSource | null
}
const initialState: apiControllerState = {
  controller: null,
}

const apiControllerSlice = createSlice({
  name: 'apiController',
  initialState,
  reducers: {
    setController(state, action: PayloadAction<CancelTokenSource | null>) {
      state.controller = action.payload
    },
    reset(state) {
      state.controller = null
    },
  },
})

export const apiControllerActions = apiControllerSlice.actions
export const apiControllerReducer = apiControllerSlice.reducer
