import { useSetScreen, useUpdateDashboardHeaderHeight } from '@/redux/app/hooks'
import { useMediaQuery, useTheme } from '@mui/material'
import React, { ReactNode, useEffect } from 'react'

type Props = {
  children: ReactNode
}

const WindowWrap = ({ children }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md')).valueOf()
  // const isTablet = useMediaQuery(
  //   theme.breakpoints.between('sm', 'md')
  // ).valueOf()
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  // const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const dashboardHeaderContainer =
    document && document.querySelector('#header-dashboard-container')

  const handleSetScreenType = useSetScreen()
  const handleUpdateDbHeader = useUpdateDashboardHeaderHeight()
  useEffect(() => {
    isMobile && handleSetScreenType('mobile')
  }, [isMobile])
  useEffect(() => {
    isLaptop && handleSetScreenType('laptop')
  }, [isLaptop])

  useEffect(() => {
    if (isMobile && dashboardHeaderContainer) {
      handleUpdateDbHeader(
        (dashboardHeaderContainer as HTMLElement).offsetHeight
      )
    }
  }, [dashboardHeaderContainer, isMobile])
  return <>{children}</>
}

export default WindowWrap
