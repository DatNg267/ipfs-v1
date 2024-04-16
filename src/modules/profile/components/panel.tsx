import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import LineProgress from '@/components/molecules/line-progress'
import { Icons } from '@/themes/_icons'
import { fontSize } from '@/themes/font'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import UsageInfo from './usage-info'
import { APP_BORDER_RADIUS_PRIMARY, breakpoints } from '@/themes/_theme'
import { useGetThisMonthUsages } from '@/modules/billing/resources/hooks'
import { DEFAULT_FETCH_LIMIT } from '@/constants'
import { FetchDataStatus } from '@/types'
import { ThisMonthUsage } from '@/types/billing'
import router from 'next/router'

type Props = {}

const ProfilePanel = (props: Props) => {
  const onGetList = useGetThisMonthUsages()

  const [thisMonthUsage, setThisMonthUsage] = useState<ThisMonthUsage | null>(
    null
  )
  const [fetchDataStatus, setFetchDataStatus] =
    useState<FetchDataStatus>('Fetching')

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

  return (
    <Stack
      spacing={{ xs: '32px', md: 0 }}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flex: 1,
        m: 0,
        overflow: 'hidden',
        [breakpoints.down('md')]: {
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          padding: '28px',
          backgroundColor: 'background.default',
        },
      }}
    >
      <Stack
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          position: 'relative',
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          [breakpoints.down('md')]: {
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
          },
        }}
      >
        <Box
          sx={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '50%',
            backgroundColor: 'background.default',
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            [breakpoints.down('md')]: {
              borderRadius: '0px',
            },
          }}
        />
        <Box
          sx={{
            border: 'none',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'background.default',
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            borderBottomRightRadius: '0px',
            borderTopLeftRadius: '0px',
            [breakpoints.down('md')]: {
              borderRadius: '0px',
            },
          }}
        />

        <Typography
          color='primary'
          variant='h3'
          textAlign={'center'}
          sx={{
            ...fontSize[96],
            fontWeight: 700,
            letterSpacing: '0.04em',
            zIndex: 10,
            position: 'relative',
            [breakpoints.down('md')]: {
              ...fontSize['34'],
              width: 'min-content',
            },
          }}
        >
          YOUR CURRENT PLAN
          <SvgIconCustomized
            component={Icons.Subtract}
            sx={{
              color: (theme) => theme.palette.baseGray[700],
              fontSize: '20px',
              position: 'absolute',
              top: '0',
              left: '126px',
              transform: 'translateY(-100%)',
              [breakpoints.down('md')]: {
                top: '5px',
                left: '10px',
                transform: 'unset',
              },
            }}
          />
          <SvgIconCustomized
            component={Icons.Subtract}
            sx={{
              color: 'primary.main',
              fontSize: '39px',
              position: 'absolute',
              top: '-10px',
              left: '78px',
              transform: 'translateY(-100%)',
              [breakpoints.down('md')]: {
                fontSize: '30px',
                top: '-20px',
                left: '-20px',
                transform: 'unset',
              },
            }}
          />
          <SvgIconCustomized
            component={Icons.Subtract}
            sx={{
              color: (theme) => theme.palette.baseGray[700],
              fontSize: '39px',
              position: 'absolute',
              bottom: '-13px',
              left: '158px',
              transform: 'translateY(100%)',
              [breakpoints.down('md')]: {
                fontSize: '30px',
                bottom: 0,
                right: 0,
                transform: 'unset',
              },
            }}
          />
          <SvgIconCustomized
            component={Icons.Subtract}
            sx={{
              display: 'none',
              color: 'primary.main',
              fontSize: '20px',
              position: 'absolute',
              transform: 'translateY(-100%)',
              [breakpoints.down('md')]: {
                display: 'block',
                bottom: '12px',
                right: '-20px',
              },
            }}
          />
        </Typography>
      </Stack>

      <Stack
        flex={1}
        spacing={{ xs: '32px', md: 1 }}
        justifyContent={{ xs: 'flex-start', md: 'space-between' }}
        sx={{
          overflow: 'hidden',
          [breakpoints.down('md')]: {
            overflow: 'unset',
          },
        }}
      >
        <UsageInfo
          title='Storage'
          usage={thisMonthUsage?.total_storage || 0}
          total={7}
          styles={{
            sx: {
              borderTopLeftRadius: '0px',
              [breakpoints.down('md')]: {
                borderRadius: '0px',
              },
            },
          }}
        />
        <UsageInfo
          title='Dedicated Bandwidth'
          usage={thisMonthUsage?.bandwidth_usage || 0}
          total={7}
          styles={{
            sx: {
              borderBottomLeftRadius: '0px',
              [breakpoints.down('md')]: {
                borderRadius: '0px',
              },
            },
          }}
        />
      </Stack>
    </Stack>
  )
}

export default ProfilePanel
