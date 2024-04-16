import { formatFileSize } from '@/utils/tools'
import { List, ListItem, Typography } from '@mui/material'
import React from 'react'

type Props = {
  file: File
}

const LocalFileItem = ({ file }: Props) => {
  return (
    <ListItem
      sx={{
        justifyContent: 'space-between',
        p: 0,
        m: 0,
        mt: 4,
        minHeight: '36px',
        borderBottom: '1px solid',
        borderColor: 'border.light',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant='body1'
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        noWrap
      >
        {file.name}
      </Typography>
      <Typography variant='body1' ml={10}>
        {formatFileSize(file.size).size}&nbsp;{formatFileSize(file.size).unit}
      </Typography>
    </ListItem>
  )
}

export default LocalFileItem
