import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import {
  FileType,
  formatFileSize,
  getTypeFileFromFileName,
  truncateAddress,
} from '@/utils/tools'
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'

type Props = {
  name?: string
  size?: number
  hash?: string
  [key: string]: any
}

const ListFileItem = ({ hash, name, size, ...props }: Props) => {
  const type = name ? getTypeFileFromFileName(name) : 'file'

  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        p: '1px',
        mb: 2,
        justifyContent: 'space-between',
        '&:hover': {
          backgroundColor:
            hash && name && size !== undefined
              ? (theme) => theme.palette.primary.main
              : 'transparent',
          color:
            hash && name && size !== undefined
              ? (theme) => theme.palette.text.primary
              : 'transparent',
        },
        '&:hover .icon-eye': {
          display: 'flex',
        },
        borderRadius: '4px',
      }}
      {...props}
    >
      {type && hash && name && size !== undefined ? (
        <>
          <Stack
            direction={'row'}
            spacing={2}
            className='item-wrapper'
            sx={{ overflow: 'hidden' }}
          >
            <Stack
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                width: '60px',
                borderRadius: '4px',
                overflow: 'hidden',
                height: '60px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.baseGray[800],
                backgroundColor: (theme) => theme.palette.baseGray[900],
              }}
            >
              <SvgIconCustomized
                component={renderIcon(type)}
                sx={{ color: 'primary.main' }}
              />
            </Stack>

            <Stack flex={1} sx={{ overflow: 'hidden' }}>
              <Typography
                variant='body2'
                fontWeight={600}
                noWrap
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {name}
              </Typography>
              <Typography component={'span'} variant='body2'>
                <Typography
                  component={'span'}
                  variant='body2'
                  sx={{ color: (theme) => theme.palette.blue[500] }}
                >
                  {truncateAddress(hash)}
                </Typography>
                &nbsp;|&nbsp;{formatFileSize(size).size}{' '}
                {formatFileSize(size).unit}
              </Typography>
            </Stack>
          </Stack>

          <IconButton
            className='icon-eye'
            sx={{
              display: 'none',
            }}
          >
            <SvgIconCustomized
              component={Icons.Eye}
              sx={{ color: 'primary.main' }}
            />
          </IconButton>
        </>
      ) : (
        <Stack flex={1} direction={'row'} spacing={2} className='item-wrapper'>
          <Skeleton animation='wave' height={60} width={60}></Skeleton>
          <Stack justifyContent={'center'} flex={1} spacing={2}>
            <Skeleton animation='wave' height={24}></Skeleton>
            <Skeleton
              animation='wave'
              height={24}
              width={100}
              sx={{
                backgroundColor: (theme) => theme.palette.baseGray[700],
              }}
            ></Skeleton>
          </Stack>
        </Stack>
      )}
    </ListItem>
  )
}

export default ListFileItem
const renderIcon = (type: FileType) => {
  switch (type) {
    case 'img': {
      return Icons.Image
    }
    case 'video': {
      return Icons.Video
    }
    case 'text': {
      return Icons.Document
    }
    case 'audio': {
      return Icons.Audio
    }
    default: {
      return Icons.Document
    }
  }
}
