import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
  [key: string]: any
}

const LayerLoading = ({ ...props }: Props) => {
  return (
    <Stack
      className='layer-loading'
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
      {...props}
    >
      <Stack alignItems={'center'}>
        <CircularProgress
          size={24}
          sx={{
            color: 'primary.main',
          }}
        />
        <Typography variant='body1' color='primary.main'>
          Please wait...
        </Typography>
        <Typography variant='body1' color='primary.main' textAlign={'center'}>
          {`We're checking your files. It'll just take a moments`}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default LayerLoading
