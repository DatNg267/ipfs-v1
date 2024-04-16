import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useCallback, useContext } from 'react'
import { ApiKeysPageContext } from '../resources'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import ButtonCustomized from '@/components/atoms/button'

type Props = {
  name?: string | null
  id?: string | null
}

const ModalRevokeApiKey = ({ name, id }: Props) => {
  const getColor = usePageColor()
  const color = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const { handleRevokeApiKey, statusRevoke, setStatusRevoke } =
    useContext(ApiKeysPageContext)

  const handleRevoke = useCallback(() => {
    if (id) {
      setStatusRevoke('revoking')
      handleRevokeApiKey(id)
    } else {
    }
  }, [handleRevokeApiKey, id, setStatusRevoke])
  return (
    <Modal
      open={openModal === ApplicationModal.REVOKE_API_KEY}
      onClose={handleCloseModal}
    >
      <WrapperPopup>
        <PopupHeading
          mainColor={color}
          title='Revoke API Key'
          handleCloseModal={handleCloseModal}
          disabledClose={statusRevoke === 'revoking'}
        />

        <Paper
          sx={{
            p: 4,
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={2} justifyContent={'center'}>
              <Typography variant='body1' textAlign={'center'}>
                Are you sure you want to revoke the key named
              </Typography>

              <Typography
                textAlign={'center'}
                variant='body1'
                fontWeight={'bold'}
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                “{name || id}“?
              </Typography>
              <Typography variant='body1' textAlign={'center'}>
                This cannot be undone.
              </Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <ButtonCustomized
                variant='outlined'
                fullWidth
                color='secondary'
                size='large'
                animateDisabled={statusRevoke === 'revoking'}
                disabled={statusRevoke === 'revoking'}
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
                animateDisabled={statusRevoke === 'revoking'}
                onClick={statusRevoke === 'revoking' ? undefined : handleRevoke}
                startIcon={
                  statusRevoke === 'revoking' && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'primary',
                      }}
                    ></CircularProgress>
                  )
                }
              >
                {<Typography variant='body1'>Delete</Typography>}
              </ButtonCustomized>
            </Stack>
          </Stack>
        </Paper>
      </WrapperPopup>
    </Modal>
  )
}

export default ModalRevokeApiKey
