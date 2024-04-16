import ButtonCustomized from '@/components/atoms/button'
import { InputBaseStyled } from '@/components/atoms/input/base'
import {
  default as MenuItemCustomized,
  default as MenuItemStyled,
} from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import {
  Button,
  Grid,
  Menu,
  Paper,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
  keyframes,
  styled,
} from '@mui/material'
import Box from '@mui/material/Box'
import PopupState from 'material-ui-popup-state'
import { bindMenu, bindTrigger } from 'material-ui-popup-state/hooks'
type Props = {}

const PaperStyled = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  padding: 20,
}))
const objAnimate = {
  '0%': { left: '0%' },
  '100%': { left: 'calc(100%)' },
}
const animate = keyframes`
${objAnimate}
`
const Styles = (props: Props) => {
  const handleOpenModalDeposit = useOpenModal(ApplicationModal.TOP_UP)
  return (
    <Stack
      spacing={4}
      sx={{
        p: 2,
      }}
    >
      <Button onClick={handleOpenModalDeposit}>Deposit</Button>
      <Box>
        <Stack direction={'row'}>
          <Paper
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <Stack spacing={8}>
              <ButtonCustomized
                size='large'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                size='medium'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                size='small'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                disabled
                size='large'
                color='primary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
            </Stack>
          </Paper>
          <Paper
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            <Stack spacing={8}>
              <ButtonCustomized
                size='large'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                size='medium'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                size='small'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                disabled
                size='large'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
            </Stack>
          </Paper>
        </Stack>

        <Stack direction={'row'}>
          <Paper
            sx={{
              backgroundColor: 'background.default',
            }}
          >
            <Stack spacing={8}>
              <ButtonCustomized
                variant='outlined'
                size='large'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='outlined'
                size='medium'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='outlined'
                size='small'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
            </Stack>
          </Paper>
          <Paper
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            <Stack spacing={8}>
              <ButtonCustomized
                variant='outlined'
                size='large'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='outlined'
                size='medium'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='outlined'
                size='small'
                color='secondary'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
            </Stack>
            <Stack spacing={8}>
              <ButtonCustomized
                variant='contained'
                size='large'
                color='error'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='contained'
                size='medium'
                color='error'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
              <ButtonCustomized
                variant='contained'
                size='small'
                color='error'
                endIcon={<SvgIconCustomized component={Icons.ArrowRight} />}
                startIcon={<SvgIconCustomized component={Icons.ArrowLeft} />}
              />
            </Stack>
          </Paper>
        </Stack>
      </Box>
      <PaperStyled>
        <Typography variant='h4' textAlign={'center'}>
          TABLE
        </Typography>
      </PaperStyled>
      <Stack alignItems={'flex-end'}>
        <PopupWrapper>
          {({ handleClick, open, anchorEl, handleClose }) => (
            <>
              <Button onClick={handleClick}>
                <SvgIconCustomized component={Icons.Filter}></SvgIconCustomized>
              </Button>

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
              >
                <Typography>The content of the Popover.</Typography>
                <Typography>The content of the Popover.</Typography>
                <Typography>The content of the Popover.</Typography>
                <Typography>The content of the Popover.</Typography>
              </Popover>
            </>
          )}
        </PopupWrapper>
      </Stack>

      <PaperStyled>
        <Typography variant='h4' textAlign={'center'}>
          PopupState
        </Typography>
        <PopupState variant='popover'>
          {(popupState) => (
            <Box>
              <Button
                variant='contained'
                color='secondary'
                {...bindTrigger(popupState)}
              >
                Popoper
              </Button>
              <SvgIconCustomized
                {...bindTrigger(popupState)}
                component={Icons.OptionsVertical}
                htmlColor='inherit'
                sx={{
                  cursor: 'pointer',
                  ml: 2,
                  mr: 2,
                }}
              />
              <Menu {...bindMenu(popupState)}>
                <MenuItemStyled onClick={popupState.close}>
                  {' '}
                  <SvgIconCustomized
                    component={Icons.Backspace}
                    htmlColor='inherit'
                    sx={{
                      cursor: 'pointer',
                      ml: 2,
                      mr: 2,
                    }}
                  />
                  Profile
                </MenuItemStyled>
                <MenuItemStyled onClick={popupState.close}>
                  <SvgIconCustomized
                    component={Icons.Add}
                    htmlColor='inherit'
                    sx={{
                      cursor: 'pointer',
                      ml: 2,
                      mr: 2,
                    }}
                  />
                  My account
                </MenuItemStyled>
                <MenuItemStyled type='danger' onClick={popupState.close}>
                  <SvgIconCustomized
                    component={Icons.Delete}
                    htmlColor='inherit'
                    sx={{
                      cursor: 'pointer',
                      ml: 2,
                      mr: 2,
                    }}
                  />
                  Logout
                </MenuItemStyled>
              </Menu>
            </Box>
          )}
        </PopupState>
        {/* <PopupStateCustomized>
          {({ handleClick, anchorEl, handleClose, open }: any) => {
            return (
              <>
                <Button onClick={handleClick}>Clickme</Button>
                <MenuStyled
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItemStyled onClick={handleClose}>Profile</MenuItemStyled>
                  <MenuItemStyled onClick={handleClose}>
                    <SvgIconCustomized
                      component={Icons.OptionsVertical}
                      onClick={handleClick}
                      htmlColor='inherit'
                      sx={{
                        cursor: 'pointer',
                        ml: 2,
                        mr: 2,
                      }}
                    />
                    My account
                  </MenuItemStyled>
                  <MenuItemStyled type='danger' onClick={handleClose}>
                    Logout
                  </MenuItemStyled>
                </MenuStyled>
              </>
            )
          }}
        </PopupStateCustomized> */}
      </PaperStyled>

      {/* INPUT */}
      <PaperStyled>
        <Stack spacing={2}>
          <Typography variant='h4' textAlign={'center'}>
            INPUT
          </Typography>
          <TextField
            variant='outlined'
            color='primary'
            sx={{
              width: '400px',
            }}
            placeholder='place holder'
            value='Nguyễn Thành Đạt'
          >
            text outlined
          </TextField>
          <TextField
            variant='outlined'
            color='primary'
            sx={{
              width: '400px',
            }}
            placeholder='place holder'
          >
            text outlined
          </TextField>
          <TextField
            variant='standard'
            color='primary'
            sx={{
              width: '400px',
            }}
            placeholder='place holder'
          >
            text outlined
          </TextField>
          <InputBaseStyled variant='standard'></InputBaseStyled>
          <Select variant='outlined' color='primary' sx={{ width: '300px' }}>
            <MenuItemCustomized value={1}>Item 1</MenuItemCustomized>
            <MenuItemCustomized value={2}>Item 2</MenuItemCustomized>
            <MenuItemCustomized value={3}>Item 3</MenuItemCustomized>
            <MenuItemCustomized value={4}>Item 4</MenuItemCustomized>
            <MenuItemCustomized value={5}>Item 5</MenuItemCustomized>
          </Select>

          <Select variant='outlined' color='secondary' sx={{ width: '300px' }}>
            <MenuItemCustomized value={1}>Item 1</MenuItemCustomized>
            <MenuItemCustomized value={2}>Item 2</MenuItemCustomized>
            <MenuItemCustomized value={3}>Item 3</MenuItemCustomized>
            <MenuItemCustomized value={4}>Item 4</MenuItemCustomized>
            <MenuItemCustomized value={5}>Item 5</MenuItemCustomized>
          </Select>
        </Stack>
      </PaperStyled>

      {/* Typography */}
      <PaperStyled>
        <Typography variant='h4' textAlign={'center'}>
          Typography
        </Typography>
        <Typography variant='h1'> h1:{'Lorem Ipsum '}</Typography>

        <Typography variant='h2'>
          h2: {`Lorem Ipsum is simply dummy `}
        </Typography>
        <br></br>
        <Typography variant='h3'>
          h3: {`Lorem Ipsum is simply dummy `}
        </Typography>
        <br></br>
        <Typography variant='h4'>
          h4: {`Lorem Ipsum is simply dummy text of the `}
        </Typography>
        <br></br>
        <Typography variant='h5'>
          h5: {`Lorem Ipsum is simply dummy text of the printing an`}
        </Typography>
        <br></br>
        <Typography variant='h6'>
          h6:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
        <Typography variant='subtitle1'>
          subtitle1: {`Lorem Ipsum is simply dummy text of the printing`}
        </Typography>
        <br></br>
        <Typography variant='subtitle2' fontWeight={400}>
          subtitle2: {`Lorem Ipsum is simply dummy text of the printing`}
        </Typography>
        <Typography variant='subtitle2' fontWeight={600}>
          subtitle2: {`Lorem Ipsum is simply dummy text of the printing`}
        </Typography>
        <Typography variant='subtitle2' fontWeight={700}>
          subtitle2: {`Lorem Ipsum is simply dummy text of the printing`}
        </Typography>
        <br></br>
        <Typography variant='body1' fontWeight={400}>
          body1:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <Typography variant='body1' fontWeight={600}>
          body1:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <Typography variant='body1' fontWeight={700}>
          body1:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
        <Typography variant='body2' fontWeight={400}>
          body2:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <Typography variant='body2' fontWeight={600}>
          body2:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <Typography variant='body2' fontWeight={700}>
          body2:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
        <Typography sx={{ display: 'block' }} variant='caption'>
          caption:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
        <Typography sx={{ display: 'block' }} variant='overline'>
          overline:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
        <Typography sx={{ display: 'block' }} variant='button'>
          button:{' '}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry`}
        </Typography>
        <br></br>
      </PaperStyled>

      {/*  BUTTON */}
      <Paper sx={{ backgroundColor: 'white' }}>
        <Typography variant='h4' textAlign={'center'}>
          BUTTON
        </Typography>
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            p: 8,
            backgroundColor: (theme) => theme.palette.dotGreen[500],
          }}
        >
          <Button fullWidth variant='text'>
            Button text
          </Button>

          <Button
            fullWidth
            variant='contained'
            color='primary'
            sx={{
              '&:before': {
                content: '""',
                top: 0,
                left: '0%',
                width: '30px',
                height: '30px',
                background: 'blue',
                animation: `${animate} ease 0.5s infinite`,
              },
            }}
          >
            Button contained primary
          </Button>
          <Button fullWidth variant='contained' color='secondary'>
            Button contained secondary
          </Button>
          <Button fullWidth variant='contained' color='error'>
            Button contained secondary
          </Button>
          <Button fullWidth variant='contained' disabled color='secondary'>
            Button contained secondary disabled
          </Button>
          <Button fullWidth variant='outlined' color='primary'>
            Button outlined primary
          </Button>
          <Button fullWidth variant='outlined' color='secondary'>
            Button outlined secondary
          </Button>
        </Stack>
      </Paper>

      {/* ICON*/}
      <Paper sx={{ backgroundColor: 'white' }}>
        <Typography variant='h4' textAlign={'center'}>
          ICON
        </Typography>
        <Grid container>
          {Object.keys(Icons).map((key, index) => (
            <Grid item xs={2} key={index}>
              <Stack direction={'row'} alignItems={'center'}>
                <SvgIconCustomized
                  component={Icons[key]}
                  sx={{
                    fontSize: '32px',
                    m: 2,
                  }}
                ></SvgIconCustomized>
                <Typography variant='body2' textAlign={'center'}>
                  {key}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper
        sx={{
          backgroundColor: 'background.default',
        }}
      ></Paper>
    </Stack>
  )
}

export default Styles
