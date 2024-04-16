import IconButtonCustomized from '@/components/atoms/icon-button'
import { MenuItemStyled } from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { usePageColor } from '@/hooks/usePageColor'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import {
  Box,
  Container,
  Paper,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { NftsPageContext } from '../resources'

const NftsHeading = () => {
  const getPageColor = usePageColor()
  const color = getPageColor()

  const { handleOpenUploadByCid, handleOpenUpload } =
    useContext(NftsPageContext)
  return (
    <Paper
      sx={{
        backgroundColor: color,
        px: { xs: 2, md: '28px' },
        height: { xs: '48px', md: 'unset' },
      }}
    >
      <Container maxWidth='xl'>
        <Stack direction='row' justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems={'center'} spacing={8}>
            <Typography
              fontFamily={APP_FONT_FAMILY.ARRAY}
              fontWeight={'medium'}
              sx={{
                fontSize: { xs: '26px', md: '60px !important' },
                lineHeight: { xs: '34px', md: '64px !important' },
              }}
            >
              NFTs
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <PopupWrapper>
              {({ handleClick, open, anchorEl, handleClose }) => (
                <>
                  <IconButtonCustomized
                    onClick={handleClick}
                    variant='contained'
                    sx={{
                      height: { xs: '32px', md: '44px' },
                      width: { xs: '32px', md: '44px' },
                    }}
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
                    <Box component={'ul'}>
                      <MenuItemStyled
                        onClick={() => {
                          handleOpenUpload()
                          handleClose()
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
                          handleOpenUploadByCid()
                          handleClose()
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
                    </Box>
                  </Popover>
                </>
              )}
            </PopupWrapper>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}

export default NftsHeading
