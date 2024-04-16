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
import { NftsPageContext } from '../resources'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import ButtonCustomized from '@/components/atoms/button'

type Props = {
  id?: string | null
}

const ModalUnpinNft = ({ id }: Props) => {
  const getColor = usePageColor()
  const color = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()

  const { handleUnpinNft, statusUnpin, setStatusUnpin } =
    useContext(NftsPageContext)

  const handleDelete = useCallback(() => {
    if (id) {
      setStatusUnpin('pending')
      handleUnpinNft(id)
    }
  }, [handleUnpinNft, id, setStatusUnpin])
  return (
    <>
      <Modal
        open={openModal === ApplicationModal.UNPIN_NFT}
        onClose={handleCloseModal}
      >
        <WrapperPopup>
          <PopupHeading
            mainColor={color}
            title=' Unpin Nft'
            handleCloseModal={handleCloseModal}
            disabledClose={statusUnpin === 'pending'}
          />

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
                  Are you sure you want to remove this file?
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  This cannot be undone.
                </Typography>

                <Typography
                  textAlign={'center'}
                  variant='body1'
                  fontWeight={'bold'}
                >
                  {id}
                </Typography>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <ButtonCustomized
                  variant='outlined'
                  fullWidth
                  color='secondary'
                  size='large'
                  disabled={statusUnpin === 'pending'}
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
                  onClick={statusUnpin === 'pending' ? undefined : handleDelete}
                  startIcon={
                    statusUnpin === 'pending' && (
                      <>
                        <CircularProgress
                          size={24}
                          sx={{
                            color: 'primary',
                          }}
                        ></CircularProgress>
                      </>
                    )
                  }
                >
                  {<Typography variant='body1'>Unpin</Typography>}
                </ButtonCustomized>
              </Stack>
            </Stack>
          </Paper>
        </WrapperPopup>
      </Modal>
    </>
  )
}

export default ModalUnpinNft
