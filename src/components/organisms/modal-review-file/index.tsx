import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { usePageColor } from '@/hooks/usePageColor'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Modal, Paper, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import ContentCid from '../modal-review-files/content-cid'
import TabReviewFile from './tab-review-file'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '776px',
  maxWidth: '776px',
  height: '644px',
}
const MotionBox = motion(Box)
const MotionModal = motion(Modal)

const AIOZ_IPFS_PUBLIC_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

const ModalReviewFile = () => {
  const handleGetColor = usePageColor()
  const color = handleGetColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const { name, cid, size } = useAppSelector((state) => state.modalReviewFile)

  const handleCloseModal = useCloseModal()
  return (
    <AnimatePresence>
      <MotionModal
        open={openModal === ApplicationModal.REVIEW_FILE}
        onClose={handleCloseModal}
      >
        <Stack style={style}>
          <Paper
            sx={{
              backgroundColor: color,
              color: (theme) => theme.palette.text.primary,
              position: 'relative',
              px: 2,
              py: 1,
              m: 0,
              mb: 1 / 2,
            }}
          >
            <Typography variant='h4' textAlign={'center'}>
              DETAILS
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
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
              p: 0,
              m: 0,
              overflow: 'hidden',
            }}
          >
            <Stack spacing={1} direction={'row'} sx={{ height: '100%' }}>
              <Stack
                sx={{
                  maxWidth: '332px',
                  width: '332px',
                }}
                spacing={1 / 2}
              >
                {size && name && cid && (
                  <ContentCid
                    size={size}
                    name={name}
                    totalFiles={0}
                    cid={cid}
                    isFolder={false}
                  />
                )}
              </Stack>
              <Box
                flex={1}
                sx={{
                  overflow: 'hidden',
                }}
              >
                <TabReviewFile />
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </MotionModal>
    </AnimatePresence>
  )
}

export default ModalReviewFile
