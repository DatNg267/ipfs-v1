import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string
}

const ContentHeading = ({ title }: Props) => {
  return (
    <Stack>
      <Typography variant='h3' fontWeight={700}>
        {title}
      </Typography>
      <Divider></Divider>
    </Stack>
  )
}

export default ContentHeading
