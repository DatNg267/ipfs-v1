import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const DocumentFooter = (props: Props) => {
  return (
    <Stack spacing={'28px'}>
      <Divider
        sx={{
          borderColor: 'border.light',
        }}
      ></Divider>
      <Stack spacing={2} alignItems={'center'}>
        <Typography
          variant='button'
          fontWeight={400}
          textTransform='unset'
          color='text.secondary'
        >
          Last modified 22h ago
        </Typography>
        <Typography
          variant='body2'
          textTransform='uppercase'
          color='text.secondary'
        >
          WAS THIS PAGE HELPFUL?
        </Typography>
        <Stack direction={'row'} spacing={4}>
          <IconButton>
            <SvgIconCustomized
              component={Icons.NeutralFace}
              sx={{
                color: 'text.secondary',
              }}
            />
          </IconButton>
          <IconButton>
            <SvgIconCustomized
              component={Icons.PensiveFace}
              sx={{
                color: 'text.secondary',
              }}
            />
          </IconButton>
          <IconButton>
            <SvgIconCustomized
              component={Icons.WinkingFace}
              sx={{
                color: 'text.secondary',
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DocumentFooter
