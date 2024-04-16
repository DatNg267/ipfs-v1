import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { TypographyColorAnimate } from '@/components/atoms/typography-led'
import TypoLedHasBorder from '@/components/atoms/typography-led/has-border'
import { AppRouter, DEFAULT_TYPOGRAPHY_ARRAY_COLOR } from '@/constants'
import { AuthorizeStatus } from '@/redux/auth/reducer'
import { AppIcons, Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY, breakpoints } from '@/themes/_theme'
import { fontSize } from '@/themes/font'
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

const Intro = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const router = useRouter()

  const handleClick = async () => {
    router.push(AppRouter.DOCUMENT)
  }

  return (
    <>
      {/* <LayerAnimate /> */}
      <Stack
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          py: { xs: '24px', md: '60px' },
          position: 'relative',
        }}
        alignItems={'center'}
      >
        <SvgIconCustomized
          viewBox='0 0 54 54'
          component={AppIcons.W3IpfsPanel2}
          sx={{
            position: 'absolute',
            bottom: { xs: 130, md: 90 },
            right: 20,
            color: 'primary.main',
            fontSize: { xs: '54px', md: '164px' },
            animation: 'animate-rotate linear 10s infinite',
            zIndex: 20,
          }}
        />

        <Stack direction={'row'} alignItems={'center'}>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={0}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              color: (theme) => theme.palette.dotPink[500],
              fontSize: '172px',
              lineHeight: '116px',
              [breakpoints.down('lg')]: {
                fontSize: '127px',
                lineHeight: '107px',
              },
              [breakpoints.down('md')]: {
                ...fontSize['40'],
              },
              ml: '4px',
              letterSpacing: '0.01em',
            }}
          >
            AIOZ
          </TypographyColorAnimate>

          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={1}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              color: (theme) => theme.palette.dotPink[500],
              textAlign: 'left',
              fontSize: '172px',
              lineHeight: '116px',
              [breakpoints.down('lg')]: {
                fontSize: '127px',
                lineHeight: '107px',
              },
              [breakpoints.down('md')]: {
                ...fontSize['40'],
              },
              ml: '4px',
              letterSpacing: '0.01em',
            }}
          >
            WEB3
          </TypographyColorAnimate>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={2}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              color: (theme) => theme.palette.dotPink[500],
              textAlign: 'left',
              fontSize: '172px',
              lineHeight: '116px',
              [breakpoints.down('lg')]: {
                fontSize: '127px',
                lineHeight: '107px',
              },
              [breakpoints.down('md')]: {
                ...fontSize['40'],
              },
              ml: '4px',
              letterSpacing: '0.01em',
            }}
          >
            IPFS
          </TypographyColorAnimate>
        </Stack>
        <Stack
          justifyContent={'center'}
          spacing={1}
          component={'span'}
          mt={{ xs: '0', md: '32px' }}
        >
          <Box component={'span'} sx={{ textAlign: 'center' }}>
            <Typography
              component={'span'}
              variant='h3'
              color='primary.main'
              sx={{
                fontWeight: 600,
                [breakpoints.down('md')]: {
                  ...fontSize['16'],
                },
              }}
              textTransform={'uppercase'}
            >
              Revolutionizing Data Storage on the&nbsp;
            </Typography>
            <TypoLedHasBorder
              arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
              startColor={2}
              component='span'
              variant='h3'
              textTransform={'uppercase'}
              sx={{
                ...fontSize['48'],
                fontFamily: APP_FONT_FAMILY.ARRAY,
                padding: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
                fontWeight: 600,
                [breakpoints.down('md')]: {
                  ...fontSize['16'],
                },
              }}
            >
              Blockchain
            </TypoLedHasBorder>
            {!isMobile && <br></br>}
            <Typography
              component={'span'}
              variant='h3'
              color='primary.main'
              textTransform={'uppercase'}
              sx={{
                fontWeight: 600,
                [breakpoints.down('md')]: {
                  ...fontSize['16'],
                },
              }}
            >
              &nbsp;and&nbsp;
            </Typography>
            <TypoLedHasBorder
              arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
              startColor={4}
              component='span'
              variant='h3'
              textTransform={'uppercase'}
              sx={{
                ...fontSize['48'],
                fontFamily: APP_FONT_FAMILY.ARRAY,
                padding: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
                [breakpoints.down('md')]: {
                  ...fontSize['16'],
                },
              }}
            >
              P2PNetwork
            </TypoLedHasBorder>
          </Box>
        </Stack>

        <Stack alignItems={'center'} mt={{ xs: '28px', md: '32px' }}>
          <Typography
            fontWeight={400}
            color={{ xs: 'primary.main', md: 'text.secondary' }}
            variant='body1'
            textAlign={'center'}
            sx={{ maxWidth: '823px' }}
          >
            Empowering Web3 dApps with the Ultimate Storage Solution: AIOZ Web3
            IPFS. Secure, Immutable, and Ready for Game-Changing Experiences in
            Gaming, Art, Collectibles, and Beyond.
          </Typography>
        </Stack>
        <Stack
          mt={'32px'}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'center'}
          spacing={4}
          sx={{
            width: { xs: '100%', md: 'fit-content' },
          }}
        >
          <Link href={AppRouter.DOCUMENT_GET_STARTED} passHref>
            <ButtonCustomized
              variant='contained'
              color='primary'
              endIcon={
                <SvgIconCustomized
                  component={Icons.ArrowRight}
                  sx={{ fontSize: '40px' }}
                />
              }
              size={'large'}
              sx={{
                width: { xs: '100%', md: 'fit-content' },
              }}
              onClick={handleClick}
              fullWidth={isMobile ? true : false}
            >
              Get Started
            </ButtonCustomized>
          </Link>

          <Link href={AppRouter.IPFS_FILES} passHref>
            <ButtonCustomized
              variant='outlined'
              color='primary'
              size={'large'}
              sx={{
                width: { xs: '100%', md: 'fit-content' },
                minWidth: '187px',
                color: (theme) => theme.palette.primary.main,
              }}
              fullWidth={isMobile ? true : false}
              // onClick={handleTryIt}
            >
              Try it now
            </ButtonCustomized>
          </Link>
        </Stack>
      </Stack>
    </>
  )
}

export default Intro
