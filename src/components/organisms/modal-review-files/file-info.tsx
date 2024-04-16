import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { DEFAULT_GATEWAY } from '@/constants'
import { Icons } from '@/themes/_icons'
import { formatFileSize, truncateAddress } from '@/utils/tools'
import {
  IconButton,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginTop: '8px',
}))
type Props = {
  hash?: string
  name?: string
  size?: number
}
const FileInfo = ({ hash, name, size }: Props) => {
  return (
    <List disablePadding>
      {name && size !== undefined ? (
        <>
          <ListItemStyled sx={{ mt: 0 }}>
            <Typography
              component='span'
              variant='body1'
              textAlign={'center'}
              sx={{
                verticalAlign: 'unset',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              noWrap
            >
              File Name: <span style={{ fontWeight: 600 }}>{name}</span>
            </Typography>
          </ListItemStyled>

          <ListItemStyled>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              flex={1}
              alignItems={'center'}
            >
              <Typography component='span' variant='body1'>
                Size:{' '}
                <span style={{ fontWeight: 600 }}>
                  {formatFileSize(size).size} {formatFileSize(size).unit}
                </span>
              </Typography>
            </Stack>
          </ListItemStyled>

          <ListItemStyled>
            <Stack direction={'row'} alignItems={'center'} spacing={4}>
              <IconButton sx={{ m: 0, p: 0 }}>
                <SvgIconCustomized
                  component={Icons.Github}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconButton>
              <IconButton sx={{ m: 0, p: 0 }}>
                <SvgIconCustomized
                  component={Icons.Telegram}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconButton>
              <IconButton sx={{ m: 0, p: 0 }}>
                <SvgIconCustomized
                  component={Icons.Twitter}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconButton>
            </Stack>
          </ListItemStyled>
        </>
      ) : (
        <>
          <ListItemStyled sx={{ mt: 0 }}>
            <Skeleton variant='rectangular' animation='wave' height={28} />
          </ListItemStyled>
          <ListItemStyled>
            <Skeleton variant='rectangular' animation='wave' height={28} />
          </ListItemStyled>
          <ListItemStyled>
            <Skeleton variant='rectangular' animation='wave' height={28} />
          </ListItemStyled>
        </>
      )}
    </List>
  )
}

export default FileInfo
