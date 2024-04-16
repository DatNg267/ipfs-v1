import { IconButton } from '@mui/material'
import React from 'react'
import { SvgIconCustomized } from '../svg-icon'
import { Icons } from '@/themes/_icons'

type Props = {
  [key: string]: any
}

const ButtonMenu = (props: Props) => {
  return (
    <IconButton
      {...props}
      sx={{
        '&:hover': {
          '& .MuiSvgIcon-root ': {
            backgroundColor: (theme) => theme.palette.baseGray[1000],
            borderRadius: '99px',
            border: '1px solid',
            borderColor: (theme) => theme.palette.baseGray[1000],
          },
          '& .MuiSvgIcon-root path': {
            fill: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main,
          },
          '& .MuiSvgIcon-root rect': {
            stroke: (theme) => theme.palette.baseGray[1000],
          },
        },
        p: 0,
        ...props.sx,
      }}
    >
      <SvgIconCustomized
        sx={{
          color: (theme) => theme.palette.baseGray[1000],
        }}
        component={Icons.OptionsVertical}
      ></SvgIconCustomized>
    </IconButton>
  )
}

export default ButtonMenu
