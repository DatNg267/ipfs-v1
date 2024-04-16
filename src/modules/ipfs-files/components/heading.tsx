import IconButtonCustomized from '@/components/atoms/icon-button'
import MenuItemCustomized, {
  MenuItemStyled,
} from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import {
  APP_BORDER_RADIUS_PRIMARY,
  APP_FONT_FAMILY,
  breakpoints,
} from '@/themes/_theme'
import { formatFileSize } from '@/utils/tools'
import {
  Box,
  Container,
  Menu,
  MenuList,
  Paper,
  Popover,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { useRouter } from 'next/router'
import { StatusFiles } from '../resources'

type Props = {
  handleOpenUploadFile: () => void
  handleOpenCreateByCidModal: () => void
  totalFiles: number
  totalSize: number
}

const IpfsFilesHeading = ({
  handleOpenCreateByCidModal,
  handleOpenUploadFile,
  totalFiles,
  totalSize,
}: Props) => {
  const router = useRouter()
  const pinned = router.query.pinned?.toString() || 'all'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleFilter = (e: any) => {
    const value = e.target.value
    router.replace(
      {
        pathname: router.pathname,
        query: {
          pinned: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.dotMint[500],
        [breakpoints.down('md')]: {
          backgroundColor: 'transparent',
          p: 0,
        },
        px: { xs: 2, md: '28px' },
        py: 2,
      }}
    >
      <Container maxWidth='xl'>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'space-between'}
          spacing={{ xs: 1, md: 0 }}
        >
          <Paper
            sx={{
              height: { xs: '48px', md: 'unset' },
              p: 0,
              m: 0,
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              [breakpoints.down('md')]: {
                backgroundColor: (theme) => theme.palette.dotMint[500],
                px: 2,
              },
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={{ xs: 2, md: 8 }}
              justifyContent={{ xs: 'space-between', md: 'unset' }}
              sx={{
                [breakpoints.down('md')]: {
                  flex: 1,
                },
              }}
            >
              <Typography
                fontFamily={APP_FONT_FAMILY.ARRAY}
                fontWeight={'medium'}
                sx={{
                  fontSize: { xs: '26px', md: '60px !important' },
                  lineHeight: { xs: '34px', md: '64px !important' },
                }}
              >
                IPFS Files
              </Typography>
              <Box
                sx={{
                  with: 'fit-content',
                  py: { xs: 0, md: 0 },
                  px: { xs: 2, md: 2 },
                  border: '1px solid',
                  borderColor: 'border.dark',
                  borderRadius: '50px',
                  [breakpoints.down('md')]: {},
                  backgroundColor: 'background.default',
                  color: 'primary.main',
                }}
              >
                <Stack alignItems={'center'}>
                  <Typography
                    variant='body2'
                    component={'span'}
                    fontWeight={'medium'}
                  >
                    {!isMobile && 'Total:'} {totalFiles}{' '}
                    {totalFiles > 1 ? 'records' : 'record'}{' '}
                    <SvgIconCustomized
                      component={Icons.Ellipse}
                      sx={{
                        fontSize: '12px',
                      }}
                    ></SvgIconCustomized>{' '}
                    {formatFileSize(totalSize).size}{' '}
                    {formatFileSize(totalSize).unit}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
          <Paper
            sx={{
              height: { xs: '48px', md: 'unset' },
              p: 0,
              m: 0,
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              [breakpoints.down('md')]: {
                backgroundColor: (theme) => theme.palette.dotMint[500],
                px: 2,
              },
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={2}
              justifyContent={{ xs: 'space-between', md: 'unset' }}
              sx={{
                [breakpoints.down('md')]: {
                  flex: 1,
                },
              }}
            >
              <Select
                variant='outlined'
                color='primary'
                sx={{
                  width: '180px',
                  height: '44px',
                  [breakpoints.down('md')]: {
                    height: '32px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'text.primary',
                  },
                }}
                value={pinned}
                onChange={handleFilter}
                MenuProps={{
                  sx: {
                    border: '1px solid',
                    borderColor: 'border.dark',
                  },
                }}
              >
                <MenuItemStyled value={'all'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <SvgIconCustomized
                      component={Icons.Layers}
                      htmlColor='inherit'
                      sx={{
                        cursor: 'pointer',
                        ml: 1,
                        mr: 1,
                        fontSize: { xs: '20px', md: '24px' },
                      }}
                    />
                    All
                  </Stack>
                </MenuItemStyled>
                <MenuItemStyled value={'true'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <SvgIconCustomized
                      component={Icons.Pin}
                      htmlColor='inherit'
                      sx={{
                        cursor: 'pointer',
                        ml: 1,
                        mr: 1,
                        fontSize: { xs: '20px', md: '24px' },
                      }}
                    />
                    <Typography variant='body2' fontWeight={700}>
                      Pinned
                    </Typography>
                  </Stack>
                </MenuItemStyled>
                <MenuItemCustomized type='danger' value={'false'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <SvgIconCustomized
                      component={Icons.Delete}
                      htmlColor='inherit'
                      sx={{
                        cursor: 'pointer',
                        ml: 1,
                        mr: 1,
                        fontSize: { xs: '20px', md: '24px' },
                      }}
                    />
                    <Typography variant='body2' fontWeight={700}>
                      {StatusFiles.DELETED}
                    </Typography>
                  </Stack>
                </MenuItemCustomized>
              </Select>

              <PopupWrapper>
                {({ handleClick, open, anchorEl, handleClose }) => (
                  <>
                    <IconButtonCustomized
                      sx={{
                        height: { xs: '32px', md: '44px' },
                        width: { xs: '32px', md: '44px' },
                      }}
                      variant='contained'
                      onClick={handleClick}
                    >
                      <SvgIconCustomized
                        component={Icons.Add}
                        sx={{
                          fontSize: { xs: '16px', md: '24px' },
                        }}
                      ></SvgIconCustomized>
                    </IconButtonCustomized>
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      keepMounted
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
                          border: '1px solid #000',
                          overflow: 'hidden',
                        },
                      }}
                    >
                      <MenuList disablePadding>
                        <MenuItemStyled
                          onClick={() => {
                            handleClose()
                            handleOpenUploadFile()
                          }}
                        >
                          <SvgIconCustomized
                            component={Icons.Export}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          Upload File
                        </MenuItemStyled>
                        <MenuItemStyled
                          onClick={() => {
                            handleClose()
                            handleOpenCreateByCidModal()
                          }}
                        >
                          <SvgIconCustomized
                            component={Icons.Link}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          CID
                        </MenuItemStyled>
                      </MenuList>
                    </Popover>
                  </>
                )}
              </PopupWrapper>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Paper>
  )
}

export default IpfsFilesHeading
