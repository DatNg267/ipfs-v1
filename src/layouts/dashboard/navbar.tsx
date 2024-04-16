import MenuItemCustomized, {
  MenuItemStyled,
} from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import UserAvatar from '@/components/atoms/user-avatar'
import { AppRouter, NAVBAR_DASHBOARD_HEADING_MOBILE_HEIGHT } from '@/constants'
import { useOpenNavbar } from '@/redux/app/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { fixedNumber, formatEther } from '@/utils'
import {
  Box,
  Container,
  MenuList,
  Paper,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { DASHBOARD_NAVBAR_HREF } from './data'
import MbNavbar from './mb-navbar'

const LogoutModalDynamic = dynamic(
  () => import('@/components/organisms/modal-logout')
)
const DashboardLayoutNavbar = () => {
  const { user, isLogged, balance } = useAppSelector((state) => state.auth)
  const router = useRouter()

  const handleOpenModal = useOpenModal(ApplicationModal.LOG_OUT)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const openNavbar = useAppSelector((state) => state.app.openNavbar)

  const handleOpenNavbar = useOpenNavbar()
  const handleClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    rawHref: string,
    href: string
  ) => {
    if (router.asPath === rawHref) {
      e.preventDefault()
    } else {
      router.push(href)
    }
  }

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.primary.main,
        overflow: 'hidden',
        position: 'relative',
        maxHeight: { xs: '48px', md: '80px' },
        height: { xs: '48px', md: '80px' },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [breakpoints.down('md')]: {
          px: 2,
        },
      }}
    >
      <Container maxWidth='xl'>
        {isMobile && (
          <MbNavbar height={NAVBAR_DASHBOARD_HEADING_MOBILE_HEIGHT} />
        )}
        <LogoutModalDynamic />

        <Stack
          flex={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {/* LOGO */}

          <Link passHref href={AppRouter.HOME}>
            <Stack
              direction='row'
              alignItems={'center'}
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
          </Link>
          {/* NAVBAR */}
          <Stack
            spacing={8}
            direction={'row'}
            alignItems={'center'}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
            id='dashboard-navbar'
          >
            {DASHBOARD_NAVBAR_HREF.map((item, index) => (
              <Link
                href={item.href}
                passHref
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(e, item.rawhref, item.href)
                }}
              >
                <Box
                  sx={{
                    '&:hover .MuiBox-root': {
                      transform: 'translate(-50%, -100%)',
                      opacity: 0.9,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    fontWeight={'medium'}
                    sx={{
                      visibility: 'hidden',
                      color: router.asPath.includes(item.rawhref)
                        ? item.color
                        : 'inherit',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      transition: 'all ease 0.3s',
                      position: 'absolute',
                      bottom: '-50%',
                      left: '50%',
                      opacity: 0,
                      transform: 'translate(-50%, 0%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      zIndex: 1,
                    }}
                  ></Box>
                  <Typography
                    variant='subtitle2'
                    fontWeight={'medium'}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      color: router.asPath.includes(item.rawhref)
                        ? item.color
                        : 'inherit',
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Stack>

          <Box position={'relative'}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Box>
                <Typography
                  variant='button'
                  color='text.secondary'
                  textAlign={'right'}
                  textTransform={'none'}
                  fontWeight={'500'}
                >
                  Available Balance
                </Typography>
                <Typography variant='body2' textAlign={'right'}>
                  ${fixedNumber(formatEther(balance.balance))}
                </Typography>
              </Box>

              <PopupWrapper>
                {({ handleClick, open, anchorEl, handleClose }) => (
                  <>
                    <UserAvatar
                      onClick={(e) =>
                        isMobile
                          ? handleOpenNavbar(!openNavbar)
                          : handleClick(e)
                      }
                    >
                      {user
                        ? user.first_name.slice(0, 1) +
                          user.last_name.slice(0, 1)
                        : ''}
                    </UserAvatar>

                    <Popover
                      open={open}
                      keepMounted
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      sx={{
                        '& .MuiPaper-root': {
                          p: 0,
                          m: 0,
                        },
                      }}
                    >
                      <MenuList disablePadding>
                        <Link href={AppRouter.IPFS_FILES} passHref>
                          <MenuItemStyled
                            onClick={() => {
                              handleClose()
                            }}
                          >
                            <Stack direction={'row'} alignItems={'center'}>
                              <SvgIconCustomized
                                component={Icons.Grid}
                                htmlColor='inherit'
                                sx={{
                                  cursor: 'pointer',
                                  ml: 2,
                                  mr: 2,
                                }}
                              />
                              Manage
                            </Stack>
                          </MenuItemStyled>
                        </Link>
                        <Link href={AppRouter.PROFILE} passHref>
                          <MenuItemStyled onClick={handleClose}>
                            <Stack direction={'row'} alignItems={'center'}>
                              <SvgIconCustomized
                                component={Icons.User}
                                htmlColor='inherit'
                                sx={{
                                  cursor: 'pointer',
                                  ml: 2,
                                  mr: 2,
                                }}
                              />
                              Profile
                            </Stack>
                          </MenuItemStyled>
                        </Link>
                        <MenuItemCustomized
                          type='danger'
                          onClick={async () => {
                            handleOpenModal()
                            handleClose()
                          }}
                        >
                          <SvgIconCustomized
                            component={Icons.LogOut}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          Logout
                        </MenuItemCustomized>
                      </MenuList>
                    </Popover>
                  </>
                )}
              </PopupWrapper>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Paper>
  )
}

export default DashboardLayoutNavbar
