import { Typography, TypographyProps } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CellContent = ({ children, ...props }: Props & TypographyProps) => {
  return (
    <Typography
      variant='body1'
      fontWeight={'inherit'}
      noWrap
      textAlign={'left'}
      {...props}
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  )
}

export default CellContent
