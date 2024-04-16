import TableCustomized from '@/components/organisms/table'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { ThisMonthUsage } from '@/types/billing'
import { useAppSelector } from '@/redux/hooks'
import { Box, Stack, Tab, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'

import { formatEther } from '@/utils/tools'
import { fixedNumber } from '@/utils/tools'
import { BillingTag } from '../resources/types'
import BillingMonthUsageRow from './row-month-usage'
import { MONTH_HEAD_CELLS } from '../resources/data'
import { useGetThisMonthUsages } from '../resources/hooks'
import { FetchDataStatus } from '@/types'
import { TabsStyled } from '@/components/atoms/tabs/tabs'
import { APP_BORDER_RADIUS_PRIMARY, breakpoints } from '@/themes/_theme'
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
type Props = {}

const TabMonthUsage = (props: Props) => {
  const router = useRouter()

  const [thisMonthUsage, setThisMonthUsage] = useState<ThisMonthUsage | null>(
    null
  )
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

  const onGetList = useGetThisMonthUsages()

  useEffect(() => {
    if (!router.isReady) return
    let stale = true
    setFetchDataStatus('Fetching')

    onGetList({
      offset: (1 - 1) * DEFAULT_FETCH_LIMIT,
      limit: DEFAULT_FETCH_LIMIT,
    })
      .then((res) => {
        if (stale) {
          setThisMonthUsage(res.data)
          setFetchDataStatus('Fetched')
        }
      })
      .catch((err) => {
        setFetchDataStatus('Failed')
      })
    return () => {
      stale = false
      setFetchDataStatus('Fetching')
    }
  }, [])

  const rows = [
    {
      resource: 'Storage (4$ / 1 TB / month)',
      usage: thisMonthUsage?.total_storage ? thisMonthUsage?.total_storage : 0,
      cost: thisMonthUsage?.storage_cost ? thisMonthUsage.storage_cost : '0',
    },
    {
      resource: 'Dedicated Banwidth (7$ / 1 TB)',
      usage: thisMonthUsage?.bandwidth_usage
        ? thisMonthUsage.bandwidth_usage
        : 0,
      cost: thisMonthUsage?.bandwidth_cost
        ? thisMonthUsage.bandwidth_cost
        : '0',
    },
  ]

  const resCost = fixedNumber(
    (
      parseFloat(
        formatEther(
          thisMonthUsage?.storage_cost ? thisMonthUsage.storage_cost : '0'
        )
      ) +
      parseFloat(
        formatEther(
          thisMonthUsage?.bandwidth_cost ? thisMonthUsage.bandwidth_cost : '0'
        )
      )
    ).toString()
  )
  return (
    <>
      <Stack
        flex={1}
        sx={{
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          overflow: 'hidden',
          border: { xs: 'none', md: '1px solid ' },
          borderColor: 'border.dark',
          padding: { xs: 0 },
          [breakpoints.down('md')]: {
            backgroundColor: 'primary.dark',
            padding: { xs: '8px' },
          },
        }}
      >
        <TabsStyled
          value={1}
          textColor='secondary'
          TabIndicatorProps={{
            sx: {
              display: 'none',
            },
          }}
          aria-label='secondary tabs example'
          sx={{
            borderBottom: { xs: 'none', md: '1px solid' },
          }}
        >
          <Tab
            disableRipple
            label={
              <Stack
                flex={1}
                alignItems={'center'}
                justifyContent={'space-between'}
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                sx={{
                  [breakpoints.down('md')]: {
                    width: '100%',
                    flex: 1,
                    alignItems: 'unset',
                  },
                }}
              >
                This Month Usage
                <Typography
                  variant='body1'
                  fontWeight={'bold'}
                  textAlign={'left'}
                  color={`text.primary`}
                  sx={{
                    [breakpoints.down('md')]: {
                      padding: '4px 8px',
                      border: '1px solid',
                      borderColor: 'border.dark',
                      backgroundColor: 'background.paper',
                      borderRadius: '8px',
                      marginTop: '4px',
                      fontWeight: 700,
                    },
                  }}
                >
                  {moment().format('MMMM YYYY')}
                </Typography>
              </Stack>
            }
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              cursor: 'default',
              maxWidth: 'unset',
              [breakpoints.down('md')]: {
                width: '100%',
                flex: 1,
                padding: { xs: '0px !important' },
                marginBottom: '8px',
              },
            }}
            value={1}
            {...a11yProps(1)}
          ></Tab>
        </TabsStyled>

        <TableCustomized
          headTypoProps={{
            sx: {
              textTransform: 'uppercase',
              textAlign: 'left',
            },
            variant: 'body1',
            fontWeight: 'bold',
          }}
          status={fetchDataStatus}
          noItemsText='No data available'
          headCells={MONTH_HEAD_CELLS}
          rows={rows}
          renderItems={(row) => <BillingMonthUsageRow row={row} />}
          isFilled={false}
          loadingCellProps={{
            sx: {
              paddingLeft: '0px',
              minHeight: '88px',
              height: '88px',
              py: 0,
              backgroundColor: 'transparent',
            },
          }}
          tableProps={{
            sx: {
              tableLayout: 'auto',
              minHeight: '158px',
              backgroundColor: { xs: 'primary.dark', md: 'transparent' },
              // '& .MuiTableRow-root': {
              //   '&:hover': {
              //     backgroundColor: `unset !important`,
              //   },
              // },
              [breakpoints.down('md')]: {
                '& .MuiTableRow-root': {
                  backgroundColor: 'background.paper',
                  borderRadius: '8px',
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.background.paper + ` !important`,
                  },
                },
              },
            },
          }}
        />
        <Stack
          direction={'row'}
          alignItems={'center'}
          p={{ xs: '0px 8px', md: 4 }}
          justifyContent={'space-between'}
        >
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Typography variant='subtitle2'>Total charged</Typography>
            <SvgIconCustomized component={Icons.Database}></SvgIconCustomized>
          </Stack>
          <Typography variant='h4' fontWeight={'bold'} textAlign={'right'}>
            ${resCost}
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}
export default TabMonthUsage
