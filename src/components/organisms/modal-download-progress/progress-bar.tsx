import {
  DownloadStatus,
  DownloadType,
} from '@/redux/download-and-zipping/reducer'
import { css } from '@emotion/css'
import { Box, LinearProgressProps, Typography, styled } from '@mui/material'
import React from 'react'

const ProgressStyled = styled('progress')(({ theme }) => ({
  width: '100%',
  WebkitAppearance: 'none',
  appearance: 'none',
  border: 'none',
  borderRadius: '10px',
  height: '10px',
  display: 'block',
  '&::-webkit-progress-bar': {
    backgroundColor: 'transparent',
    borderRadius: '10px',
  },
  '&::-webkit-progress-value': {
    borderRadius: '10px',
    background: '#56b6ff',
  },
  '&::-moz-progress-bar': {
    borderRadius: '10px',
  },
  '&.success::-webkit-progress-value': {
    background: theme.palette.green[600],
  },
}))
type Props = {
  success: boolean
  value: number
  status: DownloadStatus
  type: DownloadType
}

const ProgressBar = ({ success, value, status, type }: Props) => {
  return (
    <Box>
      {status !== 'canceled' && (
        <>
          <Typography
            component={'p'}
            variant='button'
            textTransform={'none'}
            fontWeight={500}
            color='text.secondary'
          >
            {success
              ? 'Completed'
              : type === 'folder'
              ? 'Zipping'
              : 'Downloading'}
            &nbsp;&nbsp;
            {success ? `` : `${value}%`}
          </Typography>

          <ProgressStyled
            value={value}
            max={100}
            className={success ? 'success' : ''}
          />
        </>
      )}
      {status === 'canceled' && (
        <>
          <Typography
            component={'p'}
            variant='button'
            textTransform={'none'}
            fontWeight={500}
            color='text.secondary'
          >
            Canceled
          </Typography>
        </>
      )}
    </Box>
  )
}

export default ProgressBar
