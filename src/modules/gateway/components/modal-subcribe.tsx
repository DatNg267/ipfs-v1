import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { AppStatusAction } from '@/types'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import {
  useGetStatusSubcribeGateways,
  useSubcribeGateways,
  useUnsubcribeGateways,
} from '../resources/hooks'
import { GatewaysPageContext } from '../resources/context'
import { toast } from 'react-hot-toast'
import { usePageColor } from '@/hooks/usePageColor'
import { authActions } from '@/redux/auth/reducer'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import ButtonCustomized from '@/components/atoms/button'

type Props = {}

const ModalSubcribeDedicatedGateways = (props: Props) => {
  const getColor = usePageColor()
  const modalColor = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const onSubcribe = useSubcribeGateways()
  const [statusConfirm, setStatusConfirm] = useState<AppStatusAction>(null)
  const dispatch = useAppDispatch()

  const handleSubcribeGateways = useCallback(() => {
    setStatusConfirm('pending')
    onSubcribe({})
      .then((res) => {
        setStatusConfirm('success')
        toast.success('Your plan has been upgraded.')
        dispatch(authActions.updateSubscribeDedicatedGaways(true))

        handleCloseModal()
      })
      .catch((err) => {
        setStatusConfirm('fail')
      })
  }, [onSubcribe])

  return (
    <Modal
      onClose={handleCloseModal}
      open={openModal === ApplicationModal.SUBCRIBE_DEDICATED_GATEWAYS}
    >
      <WrapperPopup>
        <PopupHeading
          mainColor={modalColor}
          title='CONFIRM YOUR NEW PLAN'
          handleCloseModal={handleCloseModal}
          disabledClose={statusConfirm === 'pending'}
        />
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Stack spacing={4}>
            <Box py={8}>
              <Typography variant='body1'>
                Your current plan: <b>FREE</b>
              </Typography>
              <Typography variant='body1'>
                You’re upgrading to : <b>DEDICATED GATEWAY (7$/TB)</b>
              </Typography>
            </Box>

            <Stack direction={'row'} spacing={2}>
              <ButtonCustomized
                variant='outlined'
                fullWidth
                color='secondary'
                size='large'
                animateDisabled={statusConfirm === 'pending'}
                disabled={statusConfirm === 'pending'}
                onClick={() => {
                  handleCloseModal()
                }}
              >
                <Typography variant='body1'>Cancel</Typography>
              </ButtonCustomized>{' '}
              <ButtonCustomized
                variant='contained'
                fullWidth
                color='secondary'
                size='large'
                onClick={handleSubcribeGateways}
                animateDisabled={statusConfirm === 'pending'}
                disabled={statusConfirm === 'pending'}
                startIcon={
                  statusConfirm === 'pending' && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'primary',
                      }}
                    />
                  )
                }
              >
                <Typography variant='body1'>Confirm</Typography>
              </ButtonCustomized>
            </Stack>
          </Stack>
        </Paper>
      </WrapperPopup>
    </Modal>
  )
}

export default ModalSubcribeDedicatedGateways
