import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { AppRouter } from '@/constants'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { fixedNumber, formatEther } from '@/utils/tools'
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

const MotionModal = motion(Modal)

type Props = {}

const ModalLowBalance = ({}: Props) => {
  const { openModal } = useAppSelector((state) => state.appModal)
  const { balance } = useAppSelector((state) => state.auth)
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
        open={openModal === ApplicationModal.LOW_BALANCE}
      >
        <WrapperPopup>
          <Paper
            sx={{
              backgroundColor: (theme) => theme.palette.red[200],
              color: (theme) => theme.palette.text.primary,
              position: 'relative',
              px: 8,
              py: 1,
              mb: 1,
            }}
          >
            <Typography variant='h4' textAlign={'center'}>
              Low Balance
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
                <Typography
                  variant='body1'
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  CURRENT BALANCE
                </Typography>

                <Typography
                  variant='h4'
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  ${fixedNumber(formatEther(balance.balance))}
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  Your balance is running low.
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  Please top up your account.
                </Typography>
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
                </ButtonCustomized>
                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='secondary'
                  size='large'
                  onClick={handleTopup}
                >
                  <Typography variant='body1'>Top up Now</Typography>
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </MotionModal>
    </AnimatePresence>
  )
}

export default ModalLowBalance
