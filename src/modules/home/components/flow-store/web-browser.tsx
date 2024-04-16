import { EXAMPLE_GATEWAYS } from '@/constants/gateways'
import { Images, ImagesHomePage } from '@/themes/_images'
import {
  Box,
  Stack,
  Typography,
  keyframes,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}
const animationZoom = keyframes`
  100%  {
    transform: scale(1) rotate(0deg);
  }
  75% {
    transform: scale(0.95) rotate(10deg);
  }
  50% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.2) rotate(-9deg);
  }
  0% {
    transform: scale(1) rotate(0deg);
  }

`
const WebBrowser = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Stack
      spacing={4}
      flex={1}
      ml={0}
      sx={{
        '& img': {
          // position: 'relative !important',
          width: '100%',
          ...(isMobile && {
            // position: 'relative !important',
            width: '100%',
            height: 'auto',
          }),
        },
      }}
    >
      <Typography variant='h4' textAlign={{ xs: 'center', md: 'right' }}>
        WEB BROWSER
      </Typography>
      <Box
        position={'relative'}
        sx={{
          height: { xs: '233px', md: '420px' },
          border: '1px solid',
          borderColor: 'border.dark',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Heading */}
        <Stack
          alignItems={'center'}
          direction={'row'}
          sx={{
            px: { xs: 1, md: 4 },
            pr: { xs: 2, md: 4 },
            height: { xs: '36px', md: '58px' },
            backgroundColor: (theme) => theme.palette.dotBlue[500],
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              height: { xs: '28px', md: '50px' },
              width: { xs: '68px', md: '118px' },
              minWidth: { xs: '68px', md: '118px' },
            }}
          >
            <Image
              src={
                isMobile ? ImagesHomePage.TaskBarMobile : ImagesHomePage.TaskBar
              }
              alt='aioz-gateways'
              fill
              loading={'lazy'}
            />
          </Box>
          <Box
            sx={{
              px: 4,
              display: 'inline-block',
              width: { xs: '100%', md: '393px' },
              height: { xs: '20px', md: '32px' },
              border: '1px solid',
              borderColor: 'border.dark',
              borderRadius: '16px',
              backgroundColor: 'background.paper',
              overflow: 'hidden',
            }}
          >
            <Stack
              justifyContent={'center'}
              sx={{
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <Link href={EXAMPLE_GATEWAYS} passHref target='_blank'>
                <Typography
                  variant={isMobile ? 'caption' : 'body2'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  textTransform={'none'}
                  noWrap
                >
                  {EXAMPLE_GATEWAYS}
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            width: { xs: '120px', md: '250px' },
            height: { xs: '120px', md: '250px' },
            position: 'absolute',
            top: 'calc(50% + 20px)',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-9deg)',
          }}
        >
          <Box
            position={'relative'}
            sx={{
              width: '100%',
              height: '100%',
              animation: `${animationZoom} 10s linear reverse infinite `,
            }}
          >
            <Image
              src={ImagesHomePage.Files}
              alt='aioz-gateways'
              fill
              loading='lazy'
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}

export default WebBrowser
