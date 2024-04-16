import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { usePageColor } from '@/hooks/usePageColor'
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
import { toast } from 'react-hot-toast'
import { GatewaysPageContext } from '../resources/context'
import { useSubcribeGateways, useUnsubcribeGateways } from '../resources/hooks'
import { authActions } from '@/redux/auth/reducer'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import ButtonCustomized from '@/components/atoms/button'

type Props = {}

const ModalUnsubcribeDedicatedGateways = (props: Props) => {
  const getColor = usePageColor()
  const modalColor = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const onUnsubcribe = useUnsubcribeGateways()
  const [statusConfirm, setStatusConfirm] = useState<AppStatusAction>(null)
  const dispatch = useAppDispatch()

  const handleUnsubcribeGateways = useCallback(() => {
    setStatusConfirm('pending')
    onUnsubcribe({})
      .then((res) => {
        setStatusConfirm('success')
        toast.success('Your plan has been canceled.')
        dispatch(authActions.updateSubscribeDedicatedGaways(false))
        handleCloseModal()
      })
      .catch((err) => {
        toast.error(err.message)
        setStatusConfirm('fail')
      })
  }, [onUnsubcribe])

  return (
    <Modal
      onClose={handleCloseModal}
      open={openModal === ApplicationModal.UNSUBCRIBE_DEDICATED_GATEWAYS}
    >
      <WrapperPopup>
        <PopupHeading
          mainColor={modalColor}
          title='CANCEL SUBSCRIPTION'
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
              <Typography variant='body1' textAlign={'center'}>
                Are you sure you want to cancel your subscription? <br></br>This
                service will be canceled immediately
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
                onClick={handleUnsubcribeGateways}
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
                Confirm
              </ButtonCustomized>
            </Stack>
          </Stack>
        </Paper>
      </WrapperPopup>
    </Modal>
  )
}

export default ModalUnsubcribeDedicatedGateways
