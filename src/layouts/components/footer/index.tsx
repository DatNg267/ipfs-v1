import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import {
  AppRouter,
  SOCIAL_TELEGRAM_LINK,
  SOCIAL_TWITTER_LINK,
} from '@/constants'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import FooterContentNavigate from './content-navigate'

const FOOTER_DIRECTION = [
  [
    'Features',
    { title: 'Overview', href: AppRouter.DOCUMENT + '/quick-start' },
    {
      title: 'Upload IPFS Files',
      href: AppRouter.DOCUMENT + '/w3ipfs-api/pinning',
    },
    { title: 'Pining Files', href: AppRouter.DOCUMENT + '/w3ipfs-api/pinning' },
    { title: 'NFTs', href: AppRouter.DOCUMENT + '/w3ipfs-api/nft' },
  ],
  [
    'Resources',
    {
      title: 'API & SDK',
      href: 'https://www.npmjs.com/package/aioz-w3ipfs-sdk',
    },
    { title: 'Documentation', href: AppRouter.DOCUMENT },
    { title: 'Github', href: '#' },
    { title: 'Contact Us', href: 'mailto:support@aioz.io' },
  ],
]
const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <Paper sx={{ p: { xs: 4, md: 15 }, mt: 0 }}>
        <Container sx={{ px: { xs: `0 !important`, md: '32px' } }}>
          <Grid container spacing={0} columns={6}>
            <Grid item xs={6} md={4}>
              <Stack spacing={4} sx={{ maxWidth: '766px' }}>
                <Stack
                  direction='row'
                  alignItems={'center'}
                  justifyContent={{ xs: 'center', md: 'unset' }}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant='h4' fontWeight={'bold'}>
                    W3
                  </Typography>
                  <TypographyIPFS variant={'h4'} fontWeight={'bold'} />
                  <Typography variant='h4' fontWeight={'bold'}>
                    .STORAGE
                  </Typography>
                </Stack>
                <Typography
                  variant='body2'
                  color='text.primary'
                  fontWeight={500}
                  textAlign={{ xs: 'center', md: 'left' }}
                  mt={{ xs: 2, md: 0 }}
                >
                  {`W3IPFS is an NFT media management service that allows users to host, manage and share files of any kind on the blockchain of their choice. As an IPFS pinning service, we focus on giving both technical and non-technical creators a fast, easy, and reliable way to share content without limits.`}
                </Typography>

                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  alignItems={'center'}
                  spacing={4}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography variant='body2'>Follow us</Typography>
                  <Stack direction={'row'} spacing={4}>
                    <Link href={'#'} passHref>
                      <IconButton sx={{ m: 0, p: 0 }}>
                        <SvgIconCustomized
                          component={Icons.Github}
                          sx={{
                            color: 'text.primary',
                          }}
                        />
                      </IconButton>
                    </Link>
                    <Link href={SOCIAL_TELEGRAM_LINK} passHref target='_blank'>
                      <IconButton sx={{ m: 0, p: 0 }}>
                        <SvgIconCustomized
                          component={Icons.Telegram}
                          sx={{
                            color: 'text.primary',
                          }}
                        />
                      </IconButton>
                    </Link>

                    <Link href={SOCIAL_TWITTER_LINK} passHref target='_blank'>
                      <IconButton sx={{ m: 0, p: 0 }}>
                        <SvgIconCustomized
                          component={Icons.Twitter}
                          sx={{
                            fill: (theme) => theme.palette.text.primary,
                            color: 'primary.main',
                          }}
                        />
                      </IconButton>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Grid container>
                {FOOTER_DIRECTION.map((item, index) => (
                  <Grid item xs={6} md={6} key={index}>
                    <Stack>
                      <Typography
                        variant='subtitle1'
                        color='text.primary'
                        fontWeight={'bold'}
                        textAlign={
                          isMobile && index % 2 !== 0 ? 'right' : 'left'
                        }
                        mb={4}
                      >
                        {item[0] as string}
                      </Typography>
                      <Stack spacing={2}>
                        {item.slice(1, item.length).map((subItem, subIndex) => (
                          <FooterContentNavigate
                            key={subIndex}
                            index={index}
                            title={
                              (subItem as { title: string; href: string }).title
                            }
                            href={
                              (subItem as { title: string; href: string }).href
                            }
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Paper sx={{ backgroundColor: 'background.default', py: 0 }}>
        <Container>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
              height: '40px',
            }}
          >
            <Link passHref href='#'>
              <Typography
                variant='body2'
                sx={{
                  color: (theme) => theme.palette.baseGray[50],
                  [breakpoints.down('md')]: {
                    textAlign: 'center',
                  },
                }}
              >
                Terms of Service | Privacy
              </Typography>
            </Link>
            <Typography
              variant='body2'
              sx={{
                color: (theme) => theme.palette.baseGray[50],
                [breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              Copyright 2023 W3IPFS.STORAGE {isMobile ? <br></br> : <>|</>} All
              Rights Reserved
            </Typography>
          </Stack>
        </Container>
      </Paper>
    </Box>
  )
}

export default Footer
