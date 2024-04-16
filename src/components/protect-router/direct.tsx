import { AppRouter, ProtectRouterStatus } from '@/constants'
import { useCheckPermissionAndRouterValid } from '@/hooks/useProtectRouter'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { closeLoading, openLoading } from '@/services/loader'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'

type Props = {
  isRenderChildren: boolean
  children: ReactNode
}

const ValidateRouterWhenDirecting = ({
  isRenderChildren = false,
  children,
}: Props) => {
  const { isLogged, isTryCheckAuthFirstAccess } = useAppSelector(
    (state) => state.auth
  )
  const router = useRouter()
  const [validateRouterSuccess, setValidateRouterSuccess] = useState(false)
  const handleCloseModal = useCloseModal()
  const handleCheckPermissionAndRouterValid = useCheckPermissionAndRouterValid()

  const handleRouterChange = useCallback(async () => {
    if (!isTryCheckAuthFirstAccess) {
      setValidateRouterSuccess(true)
      return
    }
    if (isLogged) {
      const protectRouterResponse = await handleCheckPermissionAndRouterValid(
        true
      )
      if (protectRouterResponse) {
        setValidateRouterSuccess(true)
      } else {
        await router.replace(AppRouter.DASHBOARD)
      }
    } else {
      const protectRouterResponse = await handleCheckPermissionAndRouterValid(
        false
      )
      if (protectRouterResponse) {
        setValidateRouterSuccess(true)
      } else {
        handleCloseModal()
        await router.replace(`${AppRouter.LOGIN}?pass=${router.asPath}`)
      }
    }
    closeLoading()
  }, [
    handleCheckPermissionAndRouterValid,
    handleCloseModal,
    isLogged,
    isTryCheckAuthFirstAccess,
    router,
  ])

  useEffect(() => {
    openLoading()
    handleRouterChange()
  }, [])

  if (isRenderChildren) return <>{children}</>
  if (!validateRouterSuccess) return <></>
  else return <>{children}</>
}

export default ValidateRouterWhenDirecting
