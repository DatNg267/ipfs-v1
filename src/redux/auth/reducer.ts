import { PayloadAction } from '@reduxjs/toolkit'
import { Balance, User } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'

export enum TokenStatus {
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  VALID = 'VALID',
  INVALID_TOKEN = 'INVALID_TOKEN',
}
export enum RefreshTokenStatus {
  SUCCESS,
  FAIL,
  EXPIRED_TOKEN,
}
export enum AuthorizeStatus {
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  NOT_LOGGED = 'NOT_LOGGED',
  VALID = 'VALID',
  INVALID = 'INVALID',
}
export type AuthState = {
  isTryCheckAuthFirstAccess: boolean
  isLogged: boolean
  isExpired: boolean | null
  user: User | null
  balance: Balance
  isSubsribedDedicatedGateways: boolean
}
const initialState: AuthState = {
  isTryCheckAuthFirstAccess: false,
  isLogged: false,
  isExpired: null,
  user: null,
  balance: {
    wallet_address: '',
    balance: '0',
    is_low_balance: false,
  },
  isSubsribedDedicatedGateways: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    triedFirstTimeAcesssing(state) {
      state.isTryCheckAuthFirstAccess = true
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    updateBalance(state, action: PayloadAction<Balance>) {
      state.balance = action.payload
    },
    updateSubscribeDedicatedGaways(state, action: PayloadAction<boolean>) {
      state.isSubsribedDedicatedGateways = action.payload
    },
    login(state) {
      state.isLogged = true
      state.isExpired = null
    },
    logout(state) {
      state.isLogged = false
      state.user = null
    },
    updateExpired(state, action: PayloadAction<boolean | null>) {
      state.isExpired = action.payload
    },
    reset(state) {
      state = {
        ...initialState,
      }
    },
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
