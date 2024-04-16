import ModalExpiredToken from '@/components/organisms/expired-token'
import TopUpModal from '@/components/organisms/moda-top-up'
import ModalLowBalance from '@/components/organisms/modal-low-balance'
import ModalNotEnoughBalance from '@/components/organisms/modal-not-enough-balance'
import ListenerDirectRouter from '@/components/protect-router/direct'
import { AppRouter } from '@/constants'
import ProtectRouter from '@/components/protect-router/first-accesing'
import { Stack } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import DashboardLayoutNavbar from './navbar'
import { useRouter } from 'next/router'
import ValidateRouterFirstAccessing from '@/components/protect-router/first-accesing'
import ValidateRouterWhenDirecting from '@/components/protect-router/direct'
import ToastCustomized from '@/components/organisms/toast'
import { useCloseModal } from '@/redux/modal/hooks'
import loader from '@/components/loader/loader'
import LoadingPageComponent from '@/components/organisms/loading-page'
import Head from 'next/head'

type Props = {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter()
  const handleClose = useCloseModal()

  useEffect(() => {
    handleClose()
  }, [])
  return (
    <>
      <Head>
        <style>{loader}</style>
      </Head>
      <LoadingPageComponent />

      <ValidateRouterFirstAccessing>
        <ValidateRouterWhenDirecting isRenderChildren={false}>
          <TopUpModal />
          <ModalLowBalance />
          <ToastCustomized />
          <ModalExpiredToken />

          {router.asPath.includes(AppRouter.DASHBOARD) && (
            <ModalNotEnoughBalance />
          )}
          <Stack sx={{ height: 'auto', minHeight: '100vh' }}>
            <Stack flex={1}>
              <Stack id='header-dashboard-container' position={'relative'}>
                <DashboardLayoutNavbar />
              </Stack>
              <Stack flex={1}>{children}</Stack>
            </Stack>
          </Stack>
        </ValidateRouterWhenDirecting>
      </ValidateRouterFirstAccessing>
    </>
  )
}

export default DashboardLayout
