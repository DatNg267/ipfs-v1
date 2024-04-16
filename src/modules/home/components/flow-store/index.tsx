import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Files from './files'
import Gateways from './gateways'
import GettingStarted from './getting-started'
import NetWork from './network'
import Planet from './planet'
import Receive from './receive'
import Store from './store'
import WebBrowser from './web-browser'
import { breakpoints } from '@/themes/_theme'
import Image from 'next/image'
import { ImagesHomePage } from '@/themes/_images'
type Props = {}

const FlowStore = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Stack spacing={4}>
      <Typography
        variant='h4'
        fontWeight={'bold'}
        textTransform={'uppercase'}
        textAlign={{ xs: 'center', md: 'left' }}
      >
        Store - Storing Files with IPFS Protocol <br></br>in AIOZ Network
      </Typography>
      {/*  */}
      <Grid container columns={10} spacing={{ xs: 0, md: 0 }}>
        <Grid item xs={10} md={6}>
          <Store />
        </Grid>
        <Grid item xs={10} md={4}>
          <Files />
        </Grid>
      </Grid>
      <Stack
        alignItems={'center'}
        position={'relative'}
        sx={{
          [breakpoints.down('md')]: {
            mb: '48px !important',
          },
        }}
      >
        <Planet />
        <Box
          sx={{
            width: 'fit-content',
            height: 'fit-content',
            position: 'absolute',
            top: { md: 'calc(100% - 100px)' },
            left: '50%',
            transform: 'translateX(-43%)',
            [breakpoints.down('md')]: {
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              left: '50%',
              transform: 'translate(-50%, -40%) rotate(-21deg)',
              top: '100%',
            },
          }}
        >
          <Image
            width={isMobile ? 100 : 333}
            height={isMobile ? 128 : 387}
            src={ImagesHomePage.Plane2}
            alt='AIOZ-IPFS-FILES'
            loading='lazy'
          />
        </Box>
      </Stack>

      <Grid container columns={10} spacing={{ xs: 0, md: 0 }}>
        <Grid item xs={10} md={4}>
          <NetWork />
        </Grid>
        <Grid item xs={10} md={6}>
          <Receive />
        </Grid>
      </Grid>
      {/*  */}
      <Stack
        alignItems={'center'}
        sx={{
          position: 'relative',
        }}
      >
        <Gateways />
      </Stack>
      <Stack>
        <Stack
          mt={{ xs: '0px', md: '16px' }}
          direction={{ xs: 'column-reverse', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
        >
          <GettingStarted />
          <WebBrowser />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default FlowStore
