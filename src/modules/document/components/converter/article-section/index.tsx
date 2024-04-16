import { AppRouter } from '@/constants'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {
  path: string
  title: string
}

const DocumentArticleSection = ({ path, title }: Props) => {
  return (
    <Link
      href={`${AppRouter.DOCUMENT}/${path}`}
      passHref
      style={{ width: '100%' }}
    >
      <Button
        sx={{
          padding: { xs: 4 },
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          textAlign: 'left',
          borderRadius: '16px',
          height: '100%',
          '&:hover': {
            '& .MuiSvgIcon-root': {
              borderRadius: '99px',
              '& path': {
                color: (theme) => theme.palette.primary.main,
              },
              backgroundColor: (theme) => theme.palette.text.primary,
            },
          },
        }}
        fullWidth
        variant='outlined'
        color='secondary'
      >
        {title}
      </Button>
    </Link>
  )
}

export default DocumentArticleSection
