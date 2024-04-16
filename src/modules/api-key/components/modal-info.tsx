import { CreateApiKeyReponse } from '@/apis/api-keys/type'
import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { UserErrorMessage } from '@/utils/error'
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {
  responseCreated?: CreateApiKeyReponse | null
}

const ModalInfoApiKey = ({ responseCreated }: Props) => {
  const getColor = usePageColor()
  const color = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCopied(false)
  }, [responseCreated])

  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])

  const handleCopyAll = () => {
    navigator.clipboard.writeText(`API Key: ${responseCreated?.data.api_key}
API Secret: ${responseCreated?.data.secret_key} `)
    setCopied(true)
  }

  return (
    <>
      <Modal open={openModal === ApplicationModal.CREATE_API_KEY_INFO}>
        <WrapperPopup>
          <PopupHeading
            mainColor={color}
            title='API Key Info'
            handleCloseModal={handleCloseModal}
            disabledClose={false}
          />

          <Paper
            sx={{
              p: 4,
            }}
          >
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Typography variant='subtitle2' fontWeight={'bold'}>
                  This info will only be shown once
                </Typography>
                <Typography variant='body2'>
                  Make sure you store the info somewhere safe
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography variant='subtitle2' fontWeight={'bold'}>
                  API Key
                </Typography>
                <Typography variant='body2'>
                  {responseCreated?.data.api_key ||
                    UserErrorMessage.AN_ERROR_HAS_OCCURRED}
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography variant='subtitle2' fontWeight={'bold'}>
                  Secret Key
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {' '}
                  {responseCreated?.data.secret_key ||
                    UserErrorMessage.AN_ERROR_HAS_OCCURRED}
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
                  <Typography variant='body1'>Done</Typography>
                </ButtonCustomized>{' '}
                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='secondary'
                  size='large'
                  onClick={handleCopyAll}
                >
                  {!copied && <Typography variant='body1'>Copy all</Typography>}
                  {copied && (
                    <Stack direction={'row'} alignItems='center'>
                      <Typography
                        variant='body1'
                        sx={{
                          color: (theme) => theme.palette.green[600],
                        }}
                      >
                        Copied{' '}
                      </Typography>
                      <SvgIconCustomized
                        sx={{
                          color: (theme) => theme.palette.green[600],
                        }}
                        component={Icons.Check}
                      ></SvgIconCustomized>
                    </Stack>
                  )}
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </Modal>
    </>
  )
}

export default ModalInfoApiKey
