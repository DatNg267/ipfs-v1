import { Stack, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
}

const SwaggerWrapperParameters = ({ title, children }: Props) => {
  return (
    <Stack spacing={4}>
      <Typography variant='body2' fontWeight={'bold'}>
        {title}
      </Typography>
      <Stack spacing={4}>{children}</Stack>
    </Stack>
  )
}

export default SwaggerWrapperParameters
