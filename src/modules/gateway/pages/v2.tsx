import { GATEWAYS } from '@/constants/gateways'
import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { authActions } from '@/redux/auth/reducer'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { colorTheme } from '@/themes/_color'
import { Gateways } from '@/types/gateways'
import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import DedicatedPlan from '../components/dedicated-plan'
import GateWayHeading from '../components/heading'
import ModalSubcribeDedicatedGateways from '../components/modal-subcribe'
import ModalUnsubcribeDedicatedGateways from '../components/modal-unsubcribe'
import PublicPlan from '../components/public-plan'
import SpeedMonitor from '../components/speed-monitor'
import GatewayStyledMobile from '../components/styled-mobile'
import TableGateways from '../components/table-gateways'
import { GatewaysPageContext } from '../resources/context'
import {
  useGetGateways,
  useGetStatusSubcribeGateways,
} from '../resources/hooks'

const GatewayV2 = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const color =
    DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.href))?.color ||
    colorTheme.general.dotBlue[500]

  const { isSubsribedDedicatedGateways } = useAppSelector((state) => state.auth)
  const [speedMonitor, setSpeedMonitor] = useState<'fast' | 'low'>('low')
  const [gateways, setGateways] = useState<Gateways | null>(
    GATEWAYS.data.gateways
  )
  const dispatch = useAppDispatch()

  const onGetStatusSubcribe = useGetStatusSubcribeGateways()
  const onGetList = useGetGateways()

  useEffect(() => {
    if (isSubsribedDedicatedGateways) {
      handleChangeSpeedMonitor(true)
    } else {
      handleChangeSpeedMonitor(false)
    }
  }, [isSubsribedDedicatedGateways])

  // useEffect(() => {
  //   if (!router.isReady) return
  //   let stale = true
  //   onGetList({
  //     offset: 0,
  //     limit: DEFAULT_FETCH_LIMIT,
  //   })
  //     .then((res) => {
  //       if (stale) {
  //         setGateways(res.data.gateways)
  //       }
  //     })
  //     .catch((err) => {})
  //   return () => {
  //     stale = false
  //   }
  // }, [router])

  // const handleGetGateways = useCallback(() => {
  //   onGetList({
  //     offset: (1 - 1) * DEFAULT_FETCH_LIMIT,
  //     limit: DEFAULT_FETCH_LIMIT,
  //   })
  //     .then((res) => {
  //       setGateways(res.data.gateways)
  //     })
  //     .catch((err) => {})
  // }, [onGetList])

  // const handleRefreshList = useCallback(() => {
  //   handleGetGateways()
  // }, [handleGetGateways])
  const handleRefreshList = () => {}

  const handleChangeSpeedMonitor = (isFast: boolean) => {
    if (isSubsribedDedicatedGateways && speedMonitor === 'fast') return
    setSpeedMonitor(isFast ? 'fast' : 'low')
  }

  useLayoutEffect(() => {
    // if (!router.isReady) return
    let stale = true
    onGetStatusSubcribe({})
      .then((res) => {
        if (stale) {
          dispatch(authActions.updateSubscribeDedicatedGaways(true))
        }
      })
      .catch((err) => {
        dispatch(authActions.updateSubscribeDedicatedGaways(false))
      })
    return () => {
      stale = false
    }
  }, [])
  return (
    <GatewaysPageContext.Provider
      value={{
        handleRefreshList,
        subcribe: isSubsribedDedicatedGateways,
        gateways,
        speedMonitor,
        handleChangeSpeedMonitor,
      }}
    >
      {isSubsribedDedicatedGateways && <ModalUnsubcribeDedicatedGateways />}
      {!isSubsribedDedicatedGateways && <ModalSubcribeDedicatedGateways />}
      <GateWayHeading color={color} />
      {isMobile && (
        <GatewayStyledMobile
          subsribed={isSubsribedDedicatedGateways}
          gateways={gateways}
        />
      )}
      {!isMobile && (
        <Paper sx={{ flex: 1, p: 0 }}>
          <Container
            maxWidth='lg'
            sx={{ p: '28px !important', height: '100%' }}
          >
            <>
              <Table
                sx={{
                  borderCollapse: 'separate',
                  borderColor: 'border.dark',
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: '416px',
                        height: '528px',
                        padding: '28px',
                        paddingTop: 0,
                        paddingLeft: 0,
                      }}
                    >
                      <Stack
                        sx={{
                          border: '1px solid',
                          borderRadius: '8px',
                          borderColor: 'border.dark',
                          height: '100%',
                        }}
                      >
                        <SpeedMonitor
                          speedMonitor={speedMonitor}
                          handleChangeSpeed={handleChangeSpeedMonitor}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '480px',
                        height: '528px',
                        borderTop: '1px solid',
                        borderLeft: '1px solid',
                        borderBottom: '1px solid transparent',
                        borderTopLeftRadius: '8px',
                        padding: '28px',
                      }}
                    >
                      <PublicPlan />
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '480px',
                        height: '528px',
                        border: '1px solid',
                        borderColor: 'background.default',
                        borderBottom: '1px solid transparent',
                        padding: '28px',
                        backgroundColor: 'background.default',
                        color: 'primary.main',
                        borderTopRightRadius: '8px',
                      }}
                    >
                      <DedicatedPlan />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <TableGateways />
            </>
          </Container>
        </Paper>
      )}
    </GatewaysPageContext.Provider>
  )
}

export default GatewayV2
