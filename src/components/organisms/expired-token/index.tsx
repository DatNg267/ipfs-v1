import ButtonCustomized from '@/components/atoms/button'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { AppRouter, PUBLIC_ROUTERS } from '@/constants'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Modal, Paper, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

type Props = {}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '632px',
}
const MotionModal = motion(Modal)

const ModalExpiredToken = (props: Props) => {
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const router = useRouter()
  return (
    <>
      <MotionModal open={openModal === ApplicationModal.EXPIRED_TOKEN}>
        <WrapperPopup>
          <Paper
            sx={{
              p: 8,
            }}
          >
            <Stack spacing={8}>
              <Typography variant='h3' textAlign={'center'}>
                Expired Token!{' '}
              </Typography>
              {/* <Typography variant='body2' textAlign={'center'}>
                  Please login
                </Typography> */}
              <Stack direction='row' spacing={4}>
                <ButtonCustomized
                  fullWidth
                  size='large'
                  variant='contained'
                  color='secondary'
                  onClick={async () => {
                    handleCloseModal()
                    router.push({
                      pathname: AppRouter.LOGIN,
                      query: { prev: router.pathname },
                    })
                  }}
                >
                  Login
                </ButtonCustomized>
                <ButtonCustomized
                  fullWidth
                  size='large'
                  variant='outlined'
                  color='secondary'
                  onClick={async () => {
                    router.push({
                      pathname: AppRouter.HOME,
                    })
                    handleCloseModal()
                  }}
                >
                  Cancel
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </MotionModal>
    </>
  )
}

export default ModalExpiredToken
