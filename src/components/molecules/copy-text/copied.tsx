import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SvgIconCustomized } from '../../atoms/svg-icon'
import { Icons } from '@/themes/_icons'

type Props = {
  [key: string]: any
}

const Copied = ({ props }: Props) => {
  return (
    <Stack
      {...props}
      sx={{
        px: 4,
        py: 1,
        width: 'fit-content',
        borderRadius: '99px',
        border: '1px solid',
        borderColor: (theme) => theme.palette.baseGray[1000],
        backgroundColor: (theme) => theme.palette.green[100],
      }}
      direction='row'
      alignItems={'center'}
      justifyContent={'center'}
      spacing={1}
    >
      <Typography variant='body1'>Copied</Typography>
      <SvgIconCustomized
        component={Icons.Check}
        sx={{
          backgroundColor: (theme) => theme.palette.green[600],
          borderRadius: '99px',
        }}
      ></SvgIconCustomized>
    </Stack>
  )
}

export default Copied
