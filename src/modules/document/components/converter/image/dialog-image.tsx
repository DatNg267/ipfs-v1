'use client'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import Image from 'next/image'

export interface SimpleDialogProps {
  open: boolean
  url: string
  onClose: () => void
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, url } = props

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          m: { xs: 1, md: 10 },
          p: 0,
          display: 'flex',
          alignItems: 'center',
          '& img': {
            position: 'relative !important',
            height: 'unset !important',
          },
          maxWidth: 'unset',
        },
      }}
      maxWidth='xl'
      slotProps={{
        backdrop: {
          sx: {
            opacity: '0.5 !important',
          },
        },
      }}
      keepMounted
    >
      <IconButton
        sx={{
          position: 'fixed',
          top: 4,
          right: 4,
        }}
        onClick={onClose}
      >
        <SvgIconCustomized
          component={Icons.CloseCircle}
          sx={{
            fontSize: '30px',
            color: 'primary.main',
          }}
        />
      </IconButton>

      <Image
        alt='aioz-sdk-image'
        src={url}
        fill
        style={{ objectFit: 'contain' }}
      />
    </Dialog>
  )
}
export default SimpleDialog
