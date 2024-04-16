import { PaperStyled } from '@/components/atoms/paper'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import ValidateRouterFirstAccessing from '@/components/protect-router/first-accesing'
import { AppRouter } from '@/constants'
import { useAppSelector } from '@/redux/hooks'
import { AppIcons } from '@/themes/_icons'
import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import Line from '../components/line/line'
import AuthenticationLayoutPanel from './panel'
import ValidateRouterWhenDirecting from '@/components/protect-router/direct'
import { useCloseModal } from '@/redux/modal/hooks'
import loader from '@/components/loader/loader'
import LoadingPageComponent from '@/components/organisms/loading-page'
import Head from 'next/head'
type Props = {
  children: ReactNode
}

const AuthenticationLayout = ({ children }: Props) => {
  const { isLogged, isTryCheckAuthFirstAccess } = useAppSelector(
    (state) => state.auth
  )
  const handleClose = useCloseModal()
  const router = useRouter()

  useEffect(() => {
    handleClose()
    if (isLogged && isTryCheckAuthFirstAccess) {
      router.replace(AppRouter.DASHBOARD)
    }
  }, [])
  return (
    <>
      <Head>
        <style>{loader}</style>
      </Head>
      <LoadingPageComponent />

      {!isTryCheckAuthFirstAccess && <ValidateRouterFirstAccessing />}
      <ValidateRouterWhenDirecting isRenderChildren={true}>
        <Stack sx={{ height: 'auto', minHeight: '100vh' }}>
          <Line />
          <Paper
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              py: { xs: '6px' },
            }}
          >
            <Link passHref href={AppRouter.HOME}>
              <Stack
                direction='row'
                alignItems={'center'}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography variant='h3' fontWeight={'bold'}>
                  W3
                </Typography>
                <TypographyIPFS variant={'h3'} fontWeight={'bold'} />
                <Typography variant='h3' fontWeight={'bold'}>
                  .STORAGE
                </Typography>
              </Stack>
            </Link>
          </Paper>
          <PaperStyled sx={{ p: 8, py: 8 }}>
            <Container maxWidth='lg'>
              <Grid container sx={{ height: '100%' }}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: { xs: 'none', md: 'grid' },
                  }}
                >
                  <AuthenticationLayoutPanel />
                </Grid>
                <Grid item xs={12} md={6} px={{ xs: 0, md: 8 }}>
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <SvgIconCustomized
                      viewBox='0 0 100 100'
                      component={AppIcons.W3IpfsPanel}
                      sx={{
                        // display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        fontSize: { xs: '100px', md: '158px' },
                        animation: 'animate-rotate linear 10s infinite',
                        zIndex: 0,
                      }}
                    />
                    <Stack
                      flex={1}
                      sx={{
                        height: '100%',
                        width: '100%',
                        zIndex: 2,
                      }}
                    >
                      {children}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </PaperStyled>
        </Stack>
      </ValidateRouterWhenDirecting>
    </>
  )
}

export default AuthenticationLayout
