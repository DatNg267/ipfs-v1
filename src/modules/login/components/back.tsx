import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter } from '@/constants'
import { Icons } from '@/themes/_icons'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  href: string
}

const Back = ({ title, href }: Props) => {
  return (
    <Link href={href} passHref>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        sx={{
          '&:hover': {
            '& .MuiSvgIcon-root path': {
              fill: (theme) => theme.palette.primary.main,
            },
            '& .MuiSvgIcon-root rect': {
              fill: (theme) => theme.palette.text.primary,
            },
            '& .MuiTypography-root': {
              color: (theme) => theme.palette.text.primary,
            },
          },
        }}
      >
        <SvgIconCustomized
          component={Icons.CircleArrowLeftThin}
          sx={{
            color: 'text.secondary',
            fontSize: '20px',
          }}
        />
        <Typography variant='body2' fontWeight={500} color='text.secondary'>
          {title}
        </Typography>
      </Stack>
    </Link>
  )
}

export default Back
