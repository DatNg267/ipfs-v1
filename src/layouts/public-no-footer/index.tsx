import React from 'react'
import { Box, Stack } from '@mui/material'
import Line from '../components/line/line'
import PublicHeader from '../components/public-header'
import Footer from '../components/footer'

type Props = {
  children: React.ReactNode
}

const PublicNoFooterLayout = ({ children }: Props) => {
  return (
    <Stack sx={{ height: 'auto', minHeight: '100vh' }}>
      <Stack flex={1}>
        <Line />
        <PublicHeader />
        {children}
      </Stack>
    </Stack>
  )
}

export default PublicNoFooterLayout
