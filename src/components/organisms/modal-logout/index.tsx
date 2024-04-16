import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { AppRouter } from '@/constants'
import { useUpdateStateLogout } from '@/redux/auth/hooks'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Modal, Paper, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '632px',
}
const MotionBox = motion(Box)
const MotionModal = motion(Modal)

type Props = {}

const ModalLogout = ({}: Props) => {
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const router = useRouter()

  const handleSetStateLogout = useUpdateStateLogout()
  const handleLogout = () => {
    handleCloseModal()
    handleSetStateLogout()
    router.push(AppRouter.LOGIN)
  }
  return (
    <AnimatePresence>
      <MotionModal
        onClose={handleCloseModal}
        open={openModal === ApplicationModal.LOG_OUT}
      >
        <WrapperPopup>
          <Paper
            sx={{
              backgroundColor: (theme) => theme.palette.dotOrange[500],
              color: (theme) => theme.palette.text.primary,
              position: 'relative',
              px: 8,
              py: 1,
              mb: 1,
            }}
          >
            <Typography variant='h4' textAlign={'center'}>
              Logout
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                p: 1 / 2,
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translate(0, -50%)',
              }}
            >
              <SvgIconCustomized component={Icons.CloseCircle} />
            </IconButton>
          </Paper>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <Stack spacing={4}>
              <Stack
                spacing={2}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography variant='body1'>
                  Are you sure you want to logout?
                </Typography>
                {/* <Typography variant='body1'>This cannot be undone.</Typography> */}
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <ButtonCustomized
                  variant='outlined'
                  fullWidth
                  color='secondary'
                  size='large'
                  onClick={() => {
                    handleCloseModal()
                  }}
                >
                  <Typography variant='body1'>Cancel</Typography>
                </ButtonCustomized>{' '}
                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='error'
                  size='large'
                  onClick={handleLogout}
                >
                  {<Typography variant='body1'>Logout</Typography>}
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </MotionModal>
    </AnimatePresence>
  )
}

export default ModalLogout
