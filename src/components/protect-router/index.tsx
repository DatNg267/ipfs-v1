import { AppRouter } from '@/constants'
import { useCheckPermissionAndRouterValid } from '@/hooks/useProtectRouter'
import {
  StatusToken,
  useExpiredToken,
  useTriedFirstTimeAccessing,
  useUpdateUserInfo,
} from '@/redux/auth/hooks'
import { useAppSelector } from '@/redux/hooks'
import { closeLoading, openLoading } from '@/services/loader'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

type Props = {}

const useValidateRouter = () => {
  const [done, setDone] = useState(false)
  const { isTryCheckAuthFirstAccess, isLogged } = useAppSelector(
    (state) => state.auth
  )
  const router = useRouter()
  const handleCheckTokenExpired = useExpiredToken()
  const handleCheckPermissionAndRouterValid = useCheckPermissionAndRouterValid()
  const handleSetFirstAccess = useTriedFirstTimeAccessing()
  const handleUpdateUserData = useUpdateUserInfo()

  const handleCheckingAuthAndProtectRouter = useCallback(async () => {
    handleSetFirstAccess()
    const statusToken = await handleCheckTokenExpired()

    if (statusToken === StatusToken.VALID) {
      // profile, balance, status balance
      handleUpdateUserData()
      // user -> login, register, verify email page -> dashboard
      const protectRouterResponse = await handleCheckPermissionAndRouterValid()

      if (protectRouterResponse) {
        closeLoading()
        setDone(true)
      } else {
        router.replace(AppRouter.IPFS_FILES)
      }
    } else if (statusToken === StatusToken.INVALID) {
      // user -> dashboard -> login page
      const protectRouterResponse = await handleCheckPermissionAndRouterValid()
      if (protectRouterResponse) {
        setDone(true)
        closeLoading()
      } else {
        router.replace(`${AppRouter.LOGIN}?pass=${router.asPath}`)
      }
    } else if (statusToken === StatusToken.EXPIRED) {
    }
    closeLoading()
    setDone(true)
  }, [
    handleSetFirstAccess,
    handleCheckTokenExpired,
    handleUpdateUserData,
    handleCheckPermissionAndRouterValid,
    router,
  ])
  const handleRouterChange = useCallback(async () => {
    if (!isTryCheckAuthFirstAccess) {
      setDone(true)
      closeLoading()
      return
    }
    openLoading()
    if (isLogged) {
      const protectRouterResponse = await handleCheckPermissionAndRouterValid()
      if (protectRouterResponse) {
        setDone(true)
      } else {
        await router.replace(AppRouter.DASHBOARD)
      }
    } else {
      const protectRouterResponse = await handleCheckPermissionAndRouterValid()
      if (protectRouterResponse) {
        setDone(true)
      } else {
        await router.replace(`${AppRouter.LOGIN}?pass=${router.asPath}`)
      }
    }
    closeLoading()
    setDone(true)
  }, [
    handleCheckPermissionAndRouterValid,
    isLogged,
    isTryCheckAuthFirstAccess,
    router,
  ])

  useEffect(() => {
    openLoading()
    if (!isTryCheckAuthFirstAccess) {
      handleCheckingAuthAndProtectRouter()
    } else {
      handleRouterChange()
    }
  }, [])
  return { done }
}

export default useValidateRouter
