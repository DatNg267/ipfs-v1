import { colorTheme } from '@/themes/_color'
import { IconButton, IconButtonProps } from '@mui/material'
import React from 'react'

type Props = {
  variant: 'outlined' | 'contained'
  children: any
  color?: 'primary' | 'error'
  [key: string]: any
} & IconButtonProps

const IconButtonCustomized = ({
  variant,
  children,
  color = 'primary',
  ...props
}: Props) => {
  if (variant === 'contained') {
    return (
      <IconButton
        {...props}
        sx={{
          color: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) => theme.palette.text.primary,
          '&:hover': {
            color: (theme) => theme.palette.primary.main,
            backgroundColor: (theme) => theme.palette.baseGray[800],
          },
          ...props.sx,
        }}
      >
        {children}
      </IconButton>
    )
  } else {
    return (
      <IconButton
        {...props}
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: (theme) => theme.palette.text.primary,
          color: (theme) => theme.palette.text.primary,
          '&:hover': {
            color:
              color === 'error'
                ? (theme) => theme.palette.text.primary
                : (theme) => theme.palette.primary.main,
            backgroundColor:
              color === 'error'
                ? (theme) => theme.palette.red[400]
                : (theme) => theme.palette.text.primary,
            borderColor: (theme) => theme.palette.text.primary,
          },
          ...props.sx,
        }}
      >
        {children}
      </IconButton>
    )
  }
}

export default IconButtonCustomized
