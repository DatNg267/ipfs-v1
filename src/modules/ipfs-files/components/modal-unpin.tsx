import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useContext } from 'react'
import { IpfsFilesPageContext } from '../resources'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import ButtonCustomized from '@/components/atoms/button'

const CircularProgressStyled = styled(CircularProgress)(({ theme }) => ({
  '&.MuiCircularProgress-root': {
    width: '24px ',
    height: '24px ',
  },
}))

const MotionModal = motion(Modal)

type Props = {
  pinId?: string | null
}

const ModalUnpinIpfsFile = ({ pinId }: Props) => {
  const getColor = usePageColor()
  const color = getColor()

  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const { handleDeleteIpfsFile, statusDelete, setStatusDelete } =
    useContext(IpfsFilesPageContext)

  const handleDelete = useCallback(() => {
    if (pinId) {
      setStatusDelete('deleting')
      handleDeleteIpfsFile(pinId)
    } else {
      // toast error ?
    }
  }, [handleDeleteIpfsFile, pinId, setStatusDelete])
  return (
    <AnimatePresence>
      <MotionModal
        open={openModal === ApplicationModal.DELETE_IPFS_FILE}
        onClose={handleCloseModal}
      >
        <WrapperPopup>
          <PopupHeading
            mainColor={color}
            title='Unpin File'
            handleCloseModal={handleCloseModal}
            disabledClose={statusDelete === 'deleting'}
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
                <Typography variant='body1'>
                  Are you sure you want to remove this file?
                </Typography>
                <Typography variant='body1'>This cannot be undone.</Typography>

                <Typography variant='body1' fontWeight={'bold'}>
                  {pinId}
                </Typography>
              </Stack>

              <Stack direction={'row'} spacing={2}>
                <ButtonCustomized
                  variant='outlined'
                  fullWidth
                  color='secondary'
                  size='large'
                  animateDisabled={statusDelete === 'deleting'}
                  disabled={statusDelete === 'deleting'}
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
                  animateDisabled={statusDelete === 'deleting'}
                  onClick={
                    statusDelete === 'deleting' ? undefined : handleDelete
                  }
                  startIcon={
                    statusDelete === 'deleting' && (
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
      </MotionModal>
    </AnimatePresence>
  )
}

export default ModalUnpinIpfsFile
