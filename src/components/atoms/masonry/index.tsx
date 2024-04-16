import { Box, BoxProps } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & BoxProps
export const MansoryContent = ({
  children,
  sx,
  ...props
}: {
  sx?: any
  children: ReactNode
}) => {
  return (
    <Box
      className='mansory-content'
      sx={{
        // my: '90px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
export const MansoryItem = ({
  children,
  ...props
}: {
  children: ReactNode
  [key: string]: any
}) => {
  return <Box {...props}>{children}</Box>
}
export const MansoryLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        columnCount: { xs: '1', md: '4' },
        columnGap: '0px',
        m: { xs: 0, md: '-16px 0 -32px 0' },
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}

export default MansoryLayout
