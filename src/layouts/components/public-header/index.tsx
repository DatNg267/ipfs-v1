import ButtonCustomized from '@/components/atoms/button'
import MenuItemCustomized, {
  MenuItemStyled,
} from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import UserAvatar from '@/components/atoms/user-avatar'
import { AppRouter } from '@/constants'
import { ZINDEX_PUBLIC_HEADER } from '@/constants/ui-index'
import { useOpenNavbar } from '@/redux/app/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import {
  Box,
  Container,
  IconButton,
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
import { useEffect, useRef } from 'react'

const NAVBAR_HREF = [
  { title: 'Demo', href: '#demo' },
  { title: 'Features', href: '#features' },
  { title: 'Pricing', href: '#pricing' },
  { title: 'FAQ', href: '#faq' },
  { title: 'Documentation', href: AppRouter.DOCUMENT },
]

const LogoutModalDynamic = dynamic(
  () => import('@/components/organisms/modal-logout')
)

const PublicHeader = () => {
  const { user, isLogged } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const handleOpenModal = useOpenModal(ApplicationModal.LOG_OUT)
  const handleOpenNavbar = useOpenNavbar()
  const openNavbar = useAppSelector((state) => state.app.openNavbar)
  let lastScrollTop = useRef(0)
  let publicHeaderContainerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = () => {
    if (!isMobile) {
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop
      const mobileNavbar = document.querySelector(
        '#mobile-navbar'
      ) as HTMLElement
      if (currentScrollTop > lastScrollTop.current) {
        if (publicHeaderContainerRef.current) {
          publicHeaderContainerRef.current.style.transform = 'translateY(-110%)'
          if (mobileNavbar) {
            const x = publicHeaderContainerRef.current.getBoundingClientRect()
          }
        }
      } else if (currentScrollTop < lastScrollTop.current) {
        if (publicHeaderContainerRef.current) {
          if (mobileNavbar) {
            mobileNavbar.style.top = `${
              publicHeaderContainerRef.current.getBoundingClientRect().top +
              44 +
              4
            }px`
            mobileNavbar.style.maxHeight = `calc(100vh - ${
              publicHeaderContainerRef.current.getBoundingClientRect().top +
              44 +
              4
            }px)`
          }
          publicHeaderContainerRef.current.style.transform = 'translateY(0%)'
        }
      }
      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop
    } else {
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  return (
    <Paper
      ref={publicHeaderContainerRef}
      sx={{
        p: 0,
        px: '28px',
        py: { xs: '6px', md: '18px' },
        position: { xs: 'block', md: 'sticky' },
        top: 1,
        left: 0,
        right: 0,
        zIndex: ZINDEX_PUBLIC_HEADER,
        transition: 'transform ease 0.15s',
        height: { xs: '48px', md: '80px' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth='xl'>
        <LogoutModalDynamic />
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ width: '100%' }}
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
          >
            {NAVBAR_HREF.map((item, index) => (
              <Link
                href={item.href}
                passHref
                key={index}
                target={item.href === AppRouter.DOCUMENT ? '_blank' : '_top'}
              >
                <Typography variant='subtitle2' fontWeight={'medium'}>
                  {item.title}
                </Typography>
              </Link>
            ))}
          </Stack>

          <Box
            sx={{
              minWidth: { xs: '32px', md: '44px' },
            }}
          >
            {!isMobile && (
              <Link href={AppRouter.LOGIN} passHref>
                <ButtonCustomized
                  variant='contained'
                  color='secondary'
                  size='large'
                  sx={{
                    minWidth: '187px',
                  }}
                >
                  Log in
                </ButtonCustomized>
              </Link>
            )}
            {isMobile && (
              <IconButton
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                  backgroundColor: 'background.default',
                  width: '32px',
                  height: '32px',
                  '&:hover': {
                    backgroundColor: 'background.default',
                  },
                }}
                onClick={(e) => {
                  handleOpenNavbar(!openNavbar)
                }}
              >
                <SvgIconCustomized
                  component={Icons.Menu}
                  sx={{
                    color: 'primary.main',
                  }}
                />
              </IconButton>
            )}
            {/* {isLogged && user && (
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <PopupWrapper>
                {({ handleClick, open, anchorEl, handleClose }) => (
                  <>
                    <UserAvatar
                      onClick={(e) =>
                        isMobile
                          ? handleOpenNavbar(!openNavbar)
                          : handleClick(e)
                      }
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: 'background.default',
                        color: 'primary.main',
                      }}
                    >
                      {user.first_name.slice(0, 1) + user.last_name.slice(0, 1)}
                    </UserAvatar>

                    <Popover
                      disableScrollLock
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      keepMounted
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
                      <Box>
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
                            handleClose()
                            handleOpenModal()
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
                      </Box>
                    </Popover>
                  </>
                )}
              </PopupWrapper>
            </Stack>
          )} */}
          </Box>
        </Stack>
      </Container>
    </Paper>
  )
}

export default PublicHeader
