import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material'
import React from 'react'

type Props = {
  // primary: bg-red + path-white
  // secondary: bg-red + path-black
  variant: 'primary' | 'secondary'
  [key: string]: any
  svgIconProps?: SvgIconProps
} & IconButtonProps

const CloseCircleIcon = ({ variant, svgIconProps, ...props }: Props) => {
  if (variant === 'primary') {
    return (
      <IconButton
        {...props}
        sx={{
          p: 0,
          '&:hover': {
            '& .MuiSvgIcon-root': {
              '& rect': {
                fill: (theme) => theme.palette.red[400],
              },

              '& path': {
                fill: (theme) => theme.palette.text.primary,
              },
            },
          },
          '&:focus': {
            '& .MuiSvgIcon-root': {
              '& rect': {
                fill: (theme) => theme.palette.red[500],
              },
              '& path': {
                fill: (theme) => theme.palette.text.primary,
              },
            },
          },
          ...(props ? props.sx : {}),
        }}
      >
        <SvgIconCustomized
          component={Icons.CloseCircle}
          {...svgIconProps}
          sx={{
            color: 'text.primary',
            ...(svgIconProps ? svgIconProps.sx : {}),
          }}
        />
      </IconButton>
    )
  } else {
    return (
      <IconButton
        {...props}
        sx={{
          p: 0,
          '&:hover': {
            '& .MuiSvgIcon-root': {
              '& path': {
                color: (theme) => theme.palette.red[500],
              },
            },
          },
          ...(props ? props.sx : {}),
        }}
      >
        <SvgIconCustomized
          component={Icons.CloseCircle}
          {...svgIconProps}
          sx={{
            color: 'text.primary',
            ...(svgIconProps ? svgIconProps.sx : {}),
          }}
        />
      </IconButton>
    )
  }
}

export default CloseCircleIcon
