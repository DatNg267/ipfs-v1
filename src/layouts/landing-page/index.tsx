import { NAVBAR_PUBLIC_HEADING_HEIGHT } from '@/constants'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Footer from '../components/footer'
import Line from '../components/line/line'
import PublicHeader from '../components/public-header'
import MbNavbar from '../dashboard/mb-navbar'

type Props = {
  children: React.ReactNode
}

const PublicLayout = ({ children }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Stack sx={{ height: 'auto', minHeight: '100vh', position: 'relative' }}>
      {isMobile && <MbNavbar height={NAVBAR_PUBLIC_HEADING_HEIGHT} />}
      <Stack flex={1}>
        <Line />
        <PublicHeader />
        {children}
      </Stack>
      <Footer />
    </Stack>
  )
}

export default PublicLayout
