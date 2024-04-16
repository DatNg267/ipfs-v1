import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export type ScreenType = 'mobile' | 'tablet' | 'laptop' | 'pc'
export interface AppState {
  screenType: ScreenType
  isMobile: boolean
  openNavbar: boolean
  dashboardHeaderHeight: number
}
const initialState: AppState = {
  screenType: 'mobile',
  isMobile: false,
  openNavbar: false,
  dashboardHeaderHeight: 165,
}
const AppSclice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScreenType(state, action: PayloadAction<ScreenType>) {
      state.screenType = action.payload
      state.isMobile = action.payload === 'mobile'
    },
    openNavbar(state, action: PayloadAction<boolean>) {
      state.openNavbar = action.payload
    },
    useUpdateDashboardHeaderHeight(state, action: PayloadAction<number>) {
      state.dashboardHeaderHeight = action.payload
    },
  },
})

export const appActions = AppSclice.actions
export const appReducer = AppSclice.reducer
