import LineProgress from '@/components/molecules/line-progress'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { formatFileSize } from '@/utils'
import { Stack, StackProps, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  total?: number
  usage?: number
  styles: {
    [key: string]: any & StackProps
  }
}

const UsageInfo = ({
  title,
  total = 7,
  usage = 0,
  styles,
  ...props
}: Props) => {
  return (
    <Stack
      spacing={4}
      flex={1}
      {...styles}
      sx={{
        backgroundColor: 'background.default',
        borderRadius: APP_BORDER_RADIUS_PRIMARY,
        px: { xs: '0px', md: '44px' },
        py: { xs: '0px', md: '28px' },
        ...(styles && styles.sx ? styles.sx : {}),
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent={'space-between'}
      >
        <Typography variant='subtitle2' color='primary' fontWeight={600}>
          {title}
        </Typography>
        <Typography variant='body1' color='primary' fontWeight={500}>
          Usage: {formatFileSize(usage).size}&nbsp;
          {usage === 0 ? 'TB' : formatFileSize(usage).unit}/ {total} TB
        </Typography>
      </Stack>
      <LineProgress
        parentWidth={602}
        wrapperId='storage'
        value={(usage / (total * 1024 * 1024 * 1024 * 1024)) * 100}
      ></LineProgress>
    </Stack>
  )
}

export default UsageInfo
