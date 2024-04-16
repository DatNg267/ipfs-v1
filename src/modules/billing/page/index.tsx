import { TabsStyled } from '@/components/atoms/tabs/tabs'
import { usePageColor } from '@/hooks/usePageColor'
import { APP_BORDER_RADIUS_PRIMARY, breakpoints } from '@/themes/_theme'
import { Box, Container, Paper, Stack, Tab } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BillingHeading from '../components/heading'
import BillingPanel from '../components/panel'
import TabHistoryUsage from '../components/tab-history'
import TabMonthUsage from '../components/tab-month-usage'
import TabTopUpUsage from '../components/tab-top-up'
import { BillingTag } from '../resources/types'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'

const BillingPageContent = () => {
  const router = useRouter()
  const handleGetPageColor = usePageColor()
  const color = handleGetPageColor()
  const handleOpenModalTopUp = useOpenModal(ApplicationModal.TOP_UP)
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const tag: BillingTag = newValue === 0 ? 'history-usage' : 'top-up'
    handleChangePage(tag)
    setValue(newValue)
  }

  const handleChangePage = useCallback(
    (tag: string) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, tag: tag, page: 1 },
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )
  const openTopUP = useMemo(
    () => router.query.openTopUp === 'true',
    [router.query]
  )
  useEffect(() => {
    if (openTopUP) {
      handleOpenModalTopUp()
    }
  }, [openTopUP])
  return (
    <>
      <BillingHeading color={color} />
      <Paper
        sx={{
          p: { xs: 2, md: '28px' },
          flex: 1,
          minHeight: '900px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            flex={1}
            spacing={{ xs: '8px ', md: '28px' }}
          >
            <BillingPanel />
            <TabMonthUsage />
          </Stack>
          <Box
            mt={{ xs: '8px', md: '28px' }}
            flex={1}
            sx={{
              borderRadius: APP_BORDER_RADIUS_PRIMARY,
              overflow: 'hidden',
              borderColor: 'border.dark',
              border: { xs: 'none', md: '1px solid ' },
              padding: { xs: 0 },
              [breakpoints.down('md')]: {
                backgroundColor: 'primary.dark',
                padding: { xs: '8px' },
              },
            }}
          >
            <TabsStyled
              centered
              value={value}
              onChange={handleChange}
              textColor='secondary'
              indicatorColor='secondary'
              TabIndicatorProps={{
                sx: {
                  display: { xs: 'none', md: 'block' },
                },
              }}
              aria-label='secondary tabs example'
              sx={{
                borderBottom: { xs: 'none', md: '1px solid' },
                [breakpoints.down('md')]: {
                  '& .MuiTab-root': {
                    padding: '8px 8px',
                    paddingTop: '0px',
                    fontSize: '18px',
                  },
                },
              }}
            >
              <Tab disableRipple label='History Usage' {...a11yProps(0)} />
              <Tab disableRipple label='Top Up Usage' {...a11yProps(1)} />
            </TabsStyled>

            <Box sx={{ display: value === 0 ? 'block' : 'none' }}>
              <TabHistoryUsage />
            </Box>
            <Box sx={{ display: value === 1 ? 'block' : 'none' }}>
              <TabTopUpUsage />
            </Box>
          </Box>
        </Container>
      </Paper>
    </>
  )
}
export default BillingPageContent

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
