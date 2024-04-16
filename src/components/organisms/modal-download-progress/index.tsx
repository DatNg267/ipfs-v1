import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { ZINDEX_ZIPPING_FOLDER_POPUP } from '@/constants/ui-index'
import { usePageColor } from '@/hooks/usePageColor'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { modalDownloadProgressActions } from '@/redux/modal-download-progress/reducer'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { downloadActions } from '@/redux/download-and-zipping/reducer'
import { Icons } from '@/themes/_icons'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import FileZippingProgress from './progress'
import { truncateAddress } from '@/utils'
import { ScrollBarStyled } from '@/themes/_theme'
import CloseCircleIcon from '@/components/molecules/icons/close-circle'
const MAX_HEIGHT_MODAL_EXPANDED = '50vh'
const MAX_HEIGHT_MODAL_SHRINKED = '44px'
type Props = {}
const MotionPaper = motion(Paper)
const ModalDownloadProgress = (props: Props) => {
  const handleGetColor = usePageColor()
  const color = handleGetColor()
  const { open } = useAppSelector((state) => state.modalDownloadProgress)
  const { data } = useAppSelector((state) => state.download)
  const { name } = useAppSelector((state) => state.modalReviewFolder)

  const expandIconRef = useRef<HTMLElement | any | null>(null)
  const containerRef = useRef<HTMLElement | any | null>(null)
  const handleCloseModal = useCloseModal()
  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLElement | null>(null)

  const handleOpen = () => {
    let modal = modalRef.current as HTMLElement
    modal.style.transform = 'translate(0%, 0%)'
    modal.style.opacity = '1'
  }

  const handleClose = () => {
    dispatch(modalDownloadProgressActions.close())
    dispatch(downloadActions.resetAll())
    let modal = modalRef.current as HTMLElement
    modal.style.transform = 'translate(0%, 110%)'
    modal.style.opacity = '0'
  }

  useEffect(() => {
    if (open) {
      handleOpen()
    }
  }, [open])
  const handleExpand = () => {
    if (expandIconRef.current && containerRef.current && modalRef.current) {
      expandIconRef.current.classList.remove('shrink')
      expandIconRef.current.classList.add('expand')
      expandIconRef.current.style.transform = 'rotate(0deg)'
      modalRef.current.style.maxHeight = MAX_HEIGHT_MODAL_EXPANDED
    }
  }
  const handleToggle = () => {
    if (expandIconRef.current && containerRef.current && modalRef.current) {
      if (expandIconRef.current.classList.contains('expand')) {
        expandIconRef.current.classList.remove('expand')
        expandIconRef.current.classList.add('shrink')
        expandIconRef.current.style.transform = 'rotate(-180deg)'
        modalRef.current.style.maxHeight = MAX_HEIGHT_MODAL_SHRINKED
      } else {
        expandIconRef.current.classList.remove('shrink')
        expandIconRef.current.classList.add('expand')
        expandIconRef.current.style.transform = 'rotate(0deg)'
        modalRef.current.style.maxHeight = MAX_HEIGHT_MODAL_EXPANDED
      }
    }
  }
  const arrLength = Object.keys(data).length
  useEffect(() => {
    handleExpand()
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrLength])
  return (
    <MotionPaper
      ref={modalRef}
      sx={{
        p: '2px',
        background: (theme) => theme.palette.background.default,
        color: 'primary.main',
        m: 0,
        position: 'fixed',
        height: 'fit-content',
        overflow: 'hidden',
        width: '400px',
        maxHeight: MAX_HEIGHT_MODAL_EXPANDED,

        zIndex: ZINDEX_ZIPPING_FOLDER_POPUP,
        bottom: 8,
        right: 8,
        transform: 'translate(0%, 110%)',
        opacity: 0,
        transition: 'all ease 0.5s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 1,
        padding: 1,
      }}
    >
      <Paper
        sx={{
          backgroundColor: color,
          m: 0,
          px: 2,
          py: 1,
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant='body1' fontWeight={600}>
            Download
          </Typography>
          <Stack alignItems={'center'} direction={'row'} spacing={2}>
            <IconButton
              ref={expandIconRef}
              className='expand'
              sx={{
                p: 0,
                transition: 'transform ease 0.5s',
              }}
              onClick={handleToggle}
            >
              <SvgIconCustomized
                component={Icons.ChevronUpCircle}
                sx={{
                  color: 'text.primary',
                }}
              />
            </IconButton>
            <CloseCircleIcon variant='primary' onClick={handleClose} />
          </Stack>
        </Stack>
      </Paper>
      <Paper
        ref={containerRef}
        sx={{
          m: 0,
          px: 2,
          py: 2,
          overflow: 'auto',
          ...ScrollBarStyled,
          transition: 'max-height 0.5s ease',
        }}
      >
        <Stack spacing={4}>
          {Object.keys(data).map((item, index) => {
            return (
              <FileZippingProgress
                key={item}
                id={item}
                name={`${truncateAddress(data[item].name)}`}
                value={parseFloat(
                  (
                    (data[item].sizeDownloaded / data[item].totalSize) *
                    100
                  ).toFixed(0)
                )}
                done={data[item].status === 'done'}
                status={data[item].status}
                type={data[item].type}
              />
            )
          })}
        </Stack>
      </Paper>
    </MotionPaper>
  )
}

export default ModalDownloadProgress
