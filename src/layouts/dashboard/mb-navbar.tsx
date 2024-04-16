import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter, NAVBAR_DASHBOARD_HEADING_HEIGHT } from '@/constants'
import {
  DASHBOARD_NAVBAR_MOBILE_HREF,
  PUBLIC_NAVBAR_HREF,
} from '@/constants/navbar'
import { useOpenNavbar } from '@/redux/app/hooks'
import { useUpdateStateLogout } from '@/redux/auth/hooks'
import { useAppSelector } from '@/redux/hooks'
import { Icons } from '@/themes/_icons'
import {
  Button,
  Collapse,
  Drawer,
  Grid,
  List,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import router from 'next/router'
import React, { MouseEvent, useEffect } from 'react'

type Props = {
  height: number
}

const MbNavbar = ({ height }: Props) => {
  const isMobile = useAppSelector((state) => state.app.screenType)
  const { user, isLogged } = useAppSelector((state) => state.auth)

  const openNavbar = useAppSelector((state) => state.app.openNavbar)
  const handleOpenNavbar = useOpenNavbar()
  useEffect(() => {
    let body = document.querySelector('body')
    if (body) {
      if (openNavbar) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'inherit'
        body.style.overflowX = 'hidden'
      }
    }
  }, [openNavbar])
  const handleClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    rawHref: string,
    href: string
  ) => {
    if (router.asPath === rawHref) {
      e.preventDefault()
    } else {
      if (rawHref.includes(AppRouter.PAYMENT)) {
        router.push(AppRouter.PAYMENT_TAB)
      } else {
        router.push(href)
      }
    }
  }

  const [open, setOpen] = React.useState(true)

  const handleOpen = () => {
    setOpen(!open)
  }
  const handleLogout = useUpdateStateLogout()
  return (
    <Drawer
      open={openNavbar}
      variant='persistent'
      anchor='left'
      keepMounted={true}
      PaperProps={{
        sx: {
          top: `${height}px`,
          right: 0,
          bottom: 0,
          maxHeight: `calc(100vh - ${height}px)`,
          height: 'unset',
          border: 'none',
          borderBottom: '2px solid #333',
        },
        onTransitionEnd: (e) => {},
      }}
    >
      <Stack justifyContent={'space-between'} flex={1}>
        <List disablePadding>
          {PUBLIC_NAVBAR_HREF.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              passHref
              target={item.href === AppRouter.DOCUMENT ? '_blank' : '_self'}
              onClick={(e) => {
                e.preventDefault()
                handleOpenNavbar(false)
                handleClick(e, item.href, item.href)
              }}
            >
              <ListItemButton
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'border.light',
                  borderRadius: '0',
                  py: '12px',
                }}
              >
                <Typography variant='subtitle2' fontWeight={'medium'}>
                  {item.title}
                </Typography>
              </ListItemButton>
            </Link>
          ))}
          {isLogged && (
            <>
              <ListItemButton
                onClick={handleOpen}
                disableRipple
                sx={{
                  py: '12px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Typography variant='subtitle2' fontWeight={'medium'}>
                  My account
                </Typography>
                <SvgIconCustomized component={Icons.CaretDown} />
              </ListItemButton>

              <Collapse in={open} timeout='auto' unmountOnExit>
                <Grid
                  container
                  sx={{
                    px: 8,
                    mt: 0,
                  }}
                  spacing={4}
                >
                  {DASHBOARD_NAVBAR_MOBILE_HREF.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Link
                        href={item.href}
                        passHref
                        onClick={(e) => {
                          e.preventDefault()
                          handleOpenNavbar(false)
                          handleClick(e, item.rawhref, item.href)
                        }}
                      >
                        <Stack direction={'row'} component={'li'}>
                          <Typography
                            variant='subtitle2'
                            fontWeight={'medium'}
                            sx={{
                              color: router.asPath.includes(item.rawhref)
                                ? item.color
                                : 'inherit',
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </>
          )}
        </List>
        {isLogged && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              handleOpenNavbar(false)
              handleLogout()
              router.push(AppRouter.LOGIN)
            }}
            sx={{
              my: 8,
              mb: 2,
            }}
          >
            Logout
          </Button>
        )}
        {!isLogged && (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              handleOpenNavbar(false)
              router.push(AppRouter.LOGIN)
            }}
            sx={{
              my: 8,
              mb: 2,
            }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Drawer>
  )
}

export default MbNavbar
