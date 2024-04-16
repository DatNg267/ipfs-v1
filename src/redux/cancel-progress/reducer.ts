import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CancelTokenSource } from 'axios'

export type CancelProgressState = {
  source: CancelTokenSource | null
  // open modal
}
const initialState: CancelProgressState = {
  source: null,
  // open modal
}

const cancelProgressSlice = createSlice({
  name: 'cancelProgress',
  initialState,
  reducers: {
    updateCurrentProgress(
      state,
      action: PayloadAction<CancelTokenSource | null>
    ) {
      state.source = action.payload
    },
    reset(state) {
      state.source = null
    },
  },
})

export const cancelProgressActions = cancelProgressSlice.actions
export const CancelProgressReducer = cancelProgressSlice.reducer
