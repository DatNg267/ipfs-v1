import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {
  index: any
  title: string
  href: string
}

const FooterContentNavigate = ({ index, title, href }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Link href={href} passHref>
        <Stack
          direction={'row'}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          spacing={0}
          sx={{
            '&:hover': {
              '& .MuiSvgIcon-root': {
                width: '24px',
                maxWidth: '24px',
                opacity: 1,
              },
            },
          }}
        >
          <SvgIconCustomized
            component={Icons.Ellipse}
            sx={{
              fontSize: '18px',
              maxWidth: 0,
              opacity: 0,
              transition: 'all ease-in 0.15s',
            }}
          ></SvgIconCustomized>
          <Typography
            variant='body1'
            color='text.primary'
            textAlign={isMobile && index % 2 !== 0 ? 'right' : 'left'}
            sx={{
              flex: 1,
            }}
          >
            {title}
          </Typography>
        </Stack>
      </Link>
    </>
  )
}

export default FooterContentNavigate
