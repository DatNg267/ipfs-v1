import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import { AppRouter } from '@/constants'
import { ZINDEX_DOCUMENT_HEADER } from '@/constants/ui-index'
import { useTriedFirstTimeAccessing } from '@/redux/auth/hooks'
import { AuthorizeStatus } from '@/redux/auth/reducer'
import { Icons } from '@/themes/_icons'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { handleToggleNavbar } from './services'
import ButtonCustomized from '@/components/atoms/button'

const LogoutModalDynamic = dynamic(
  () => import('@/components/organisms/modal-logout')
)
const DocumentHeader = () => {
  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.primary.main,
        position: 'sticky',
        top: '2px',
        left: 0,
        right: 0,
        zIndex: ZINDEX_DOCUMENT_HEADER,
        px: '16px',
      }}
    >
      <LogoutModalDynamic />
      {/* {isMobile && <MbNavbar height={DOCUMENT_HEADING_MOBILE_HEIGHT} />} */}
      <Stack
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
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          {/* {isLogged && user && (
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={2}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <PopupWrapper>
                {({ handleClick, open, anchorEl, handleClose }) => (
                  <>
                    <UserAvatar
                      onClick={(e) =>
                        // isMobile
                        // ? handleOpenNavbar(!openNavbar)
                        // :
                        handleClick(e)
                      }
                    >
                      {user.first_name.slice(0, 1) + user.last_name.slice(0, 1)}
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
                      <Box>
                        <MenuItemStyled
                          onClick={() => {
                            handleClose()
                          }}
                        >
                          <Link href={AppRouter.IPFS_FILES} passHref>
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
                          </Link>
                        </MenuItemStyled>
                        <MenuItemStyled onClick={handleClose}>
                          <Link href={AppRouter.PROFILE} passHref>
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
                          </Link>
                        </MenuItemStyled>

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
                      </Box>
                    </Popover>
                  </>
                )}
              </PopupWrapper>
            </Stack>
          )} */}
          {/* {!isLogged && !isMobile && ( */}
          <Link href={AppRouter.LOGIN} passHref>
            <ButtonCustomized
              variant='contained'
              color='primary'
              size='large'
              sx={{
                minWidth: '187px',
                display: { xs: 'none', md: 'inline-flex' },
              }}
            >
              Log in
            </ButtonCustomized>
          </Link>

          {/* )} */}
          {/* {!isLogged && isMobile && (
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
          )} */}
          <IconButton
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              backgroundColor: 'primary.main',
              width: '32px',
              height: '32px',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
            onClick={(e) => {
              handleToggleNavbar()
            }}
          >
            <SvgIconCustomized
              component={Icons.Menu}
              sx={{
                color: 'text.primary',
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default DocumentHeader
