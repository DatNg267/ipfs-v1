import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import SwitchCustomized from '@/components/atoms/switch'
import { Icons } from '@/themes/_icons'
import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
type Props = {
  checked: boolean
  handleChange: (e: any, checked: boolean) => void
  totalFiles?: number
  currentFiles?: number
}

const HeadingPreviewFiles = ({
  totalFiles,
  currentFiles,
  checked,
  handleChange,
}: Props) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        mt: '0 !important',
      }}
    >
      <Stack direction={'row'} spacing={'12px'}>
        <SwitchCustomized
          value={checked}
          startIcon={Icons.Grid}
          endIcon={Icons.Laptop}
          onChange={handleChange}
        />
      </Stack>
      {(totalFiles === undefined || currentFiles === undefined) && (
        <Skeleton height={28} width={100} animation='wave'></Skeleton>
      )}
      {totalFiles !== undefined && currentFiles !== undefined && (
        <Typography variant='body1' fontWeight={600}>
          {currentFiles}/{totalFiles} files
        </Typography>
      )}
    </Stack>
  )
}

export default HeadingPreviewFiles
