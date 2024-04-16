import { AppRouter } from '@/constants'
import { useCheckPermissionAndRouterValid } from '@/hooks/useProtectRouter'
import {
  StatusToken,
  useExpiredToken,
  useTriedFirstTimeAccessing,
  useUpdateUserInfo,
} from '@/redux/auth/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { closeLoading } from '@/services/loader'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'

type Props = {
  children?: ReactNode
}
type ProtectStatus = 'init' | 'recheck' | 'pending' | 'success' | 'error'
const ValidateRouterFirstAccessing = ({ children }: Props) => {
  const [protectStatus, setProtectStatus] = useState<ProtectStatus>('init')
  const { isTryCheckAuthFirstAccess } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const handleCheckTokenExpired = useExpiredToken()
  const handleCheckPermissionAndRouterValid = useCheckPermissionAndRouterValid()
  const handleSetFirstAccess = useTriedFirstTimeAccessing()
  const handleUpdateUserData = useUpdateUserInfo()
  const handleCloseModal = useCloseModal()
  const handleCheckingAuthAndProtectRouter = useCallback(async () => {
    const statusToken = await handleCheckTokenExpired()
    handleSetFirstAccess()

    if (statusToken === StatusToken.VALID) {
      // profile, balance, status balance
      handleUpdateUserData()
      // user -> login, register, verify email page -> dashboard
      const protectRouterResponse = await handleCheckPermissionAndRouterValid(
        true
      )

      if (protectRouterResponse) {
        setProtectStatus('success')
      } else {
        setProtectStatus('error')
        await router.replace(AppRouter.IPFS_FILES)
      }
    } else if (statusToken === StatusToken.INVALID) {
      // user -> dashboard -> login page
      const protectRouterResponse = await handleCheckPermissionAndRouterValid(
        false
      )
      if (protectRouterResponse) {
        setProtectStatus('success')
      } else {
        handleCloseModal()
        await router.replace(`${AppRouter.LOGIN}?pass=${router.asPath}`)
        setProtectStatus('error')
      }
    } else if (statusToken === StatusToken.EXPIRED) {
      setProtectStatus('error')
    }
    closeLoading()
    setProtectStatus('success')
  }, [
    handleCloseModal,
    handleSetFirstAccess,
    handleCheckTokenExpired,
    handleUpdateUserData,
    handleCheckPermissionAndRouterValid,
    router,
  ])
  useEffect(() => {
    return () => {}
  }, [router, protectStatus])

  useEffect(() => {
    if (!isTryCheckAuthFirstAccess) {
      handleCheckingAuthAndProtectRouter()
    }
    return () => {}
  }, [])

  if (
    !isTryCheckAuthFirstAccess &&
    (protectStatus === 'pending' ||
      protectStatus === 'init' ||
      protectStatus === 'error')
  )
    return <></>
  else return <>{children}</>
}

export default ValidateRouterFirstAccessing
