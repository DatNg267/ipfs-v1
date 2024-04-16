import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'
import { TopUpUsages } from '@/types/billing'

export type AuthState = {
  topUpUsages: TopUpUsages | null
}
const initialState: AuthState = {
  topUpUsages: null,
}

const topUpUsageSlice = createSlice({
  name: 'topUpUsage',
  initialState,
  reducers: {
    updateHistory(state, action: PayloadAction<TopUpUsages>) {
      state.topUpUsages = action.payload
    },
  },
})

export const topUpUsageActions = topUpUsageSlice.actions
export const TopUpUsageReducer = topUpUsageSlice.reducer
