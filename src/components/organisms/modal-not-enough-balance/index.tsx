import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { AppRouter } from '@/constants'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
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

const ModalNotEnoughBalance = ({}: Props) => {
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const router = useRouter()

  const handleTopup = () => {
    handleCloseModal()
    router.push(AppRouter.PAYMENT_TAB_TOP_UP)
  }
  return (
    <AnimatePresence>
      <MotionModal
        onClose={handleCloseModal}
        open={openModal === ApplicationModal.NOT_ENOUGH_BALANCE}
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
              Process Failed
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
                <Typography variant='body1' textAlign={'center'}>
                  You don’t have enough funds in your AIOZ balance. Please top
                  up your account and try again.
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
                  <Typography variant='body1'>Close</Typography>
                </ButtonCustomized>{' '}
                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='secondary'
                  size='large'
                  onClick={handleTopup}
                >
                  <Typography variant='body1'>Top up</Typography>
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </MotionModal>
    </AnimatePresence>
  )
}

export default ModalNotEnoughBalance
