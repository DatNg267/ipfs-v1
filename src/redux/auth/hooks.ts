import { authApis } from '@/apis/auth'
import { GatewayApis } from '@/apis/gateway'
import { useAppDispatch } from '@/redux/hooks'
import { LocalStorageKey } from '@/types'
import { TokenDecode } from '@/types/token'
import { Balance } from '@/types/user'
import { AppErrorMessage } from '@/utils/error'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { useCallback } from 'react'
import { useOpenModal } from '../modal/hooks'
import { ApplicationModal } from '../modal/reducer'
import { authActions } from './reducer'

export function tokenParse(token: string) {
  if (!token) {
    throw new Error(AppErrorMessage.INVALID_TOKEN)
  }
  try {
    const decodedToken = jwt.decode(token) as unknown as TokenDecode
    return decodedToken
  } catch (err) {
    throw new Error(AppErrorMessage.INVALID_TOKEN)
  }
}
export function checkTokenIsExpired(token: string): boolean {
  try {
    const tokenParser = tokenParse(token)
    if (tokenParser) {
      const now = moment().unix()
      if (now > tokenParser.exp) return false
    }
    return true
  } catch (error) {
    return false
  }
}
export enum StatusToken {
  'INVALID',
  'VALID',
  'EXPIRED',
}
export const useExpiredToken = (): (() => Promise<StatusToken>) => {
  const handleUpdateStateLogout = useUpdateStateLogout()
  const handleOpenModalExpiredToken = useOpenModal(
    ApplicationModal.EXPIRED_TOKEN
  )
  const dispatch = useAppDispatch()

  return useCallback(async () => {
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN)
    if (
      !accessToken ||
      !refreshToken ||
      accessToken === 'undefined' ||
      refreshToken === 'undefined'
    ) {
      handleUpdateStateLogout()
      return StatusToken.INVALID
    }
    const tokenValid = checkTokenIsExpired(accessToken)
    if (!tokenValid) {
      return await authApis
        .refreshToken(refreshToken)
        .then((res) => {
          dispatch(authActions.login())
          localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, res.access_token)
          return StatusToken.VALID
        })
        .catch((err) => {
          handleUpdateStateLogout()
          handleOpenModalExpiredToken()
          return StatusToken.EXPIRED
        })
    }
    dispatch(authActions.login())
    return StatusToken.VALID
  }, [handleOpenModalExpiredToken, dispatch, handleUpdateStateLogout])
}

export function useUpdateStateLogin(): (
  accessToken: string,
  refreshToken: string
) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    async (accessToken: string, refreshToken: string) => {
      dispatch(authActions.login())
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken)
      localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken)
      try {
        const userInfo = await authApis.getInfoUser()
        dispatch(authActions.updateUser(userInfo.data.user))
      } catch (error) {}
    },
    [dispatch]
  )
}
export function useUpdateUserInfo(): () => void {
  const dispatch = useAppDispatch()
  const handleOpenModalLowBalance = useOpenModal(ApplicationModal.LOW_BALANCE)
  return useCallback(async () => {
    dispatch(authActions.login())
    try {
      const userInfo = await authApis.getInfoUser()
      const balance = await authApis.getBalance().catch((err) => {})
      const isSubsribedDedicatedGateways = await GatewayApis.getStatusSubcribe(
        {}
      )
        .then(() => true)
        .catch((err) => false)
      if (balance) {
        dispatch(authActions.updateBalance(balance.data))
        dispatch(
          authActions.updateSubscribeDedicatedGaways(
            isSubsribedDedicatedGateways
          )
        )

        if (balance.data.is_low_balance) {
          handleOpenModalLowBalance()
        }
      }
      dispatch(authActions.updateUser(userInfo.data.user))
    } catch (error) {}
  }, [dispatch, handleOpenModalLowBalance])
}
export function useUpdateStateLogout() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(authActions.logout())
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN)
  }, [dispatch])
}

export function useExpired() {
  const dispatch = useAppDispatch()
  return useCallback(
    (isExpired: boolean | null) => {
      dispatch(authActions.updateExpired(isExpired))
    },
    [dispatch]
  )
}
export function useTriedFirstTimeAccessing() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(authActions.triedFirstTimeAcesssing())
  }, [dispatch])
}

export function useUpdateBalance() {
  const dispatch = useAppDispatch()
  return useCallback(
    (balance: Balance) => {
      dispatch(authActions.updateBalance(balance))
    },
    [dispatch]
  )
}
