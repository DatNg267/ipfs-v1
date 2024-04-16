import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Avatar, AvatarProps, Typography } from '@mui/material'
import React from 'react'

const UserAvatar = (props: AvatarProps) => {
  return (
    <Avatar
      {...props}
      sx={{
        cursor: 'pointer',
        backgroundColor: 'primary.main',
        width: { xs: '32px', md: '44px' },
        height: { xs: '32px', md: '44px' },
        borderColor: (theme) => theme.palette.baseGray[600],
        fontFamily: APP_FONT_FAMILY.ARRAY,
        fontSize: { xs: '18px', md: '24px ' },
        lineHeight: { xs: '24px', md: '24px ' },
        fontWeight: 600,
        ...(props ? props.sx : {}),
        textTransform: 'uppercase',
      }}
    >
      {props.children ? props.children : '...'}
    </Avatar>
  )
}

export default UserAvatar
