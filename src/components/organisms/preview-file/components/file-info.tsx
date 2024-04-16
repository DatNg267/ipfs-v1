import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { DEFAULT_GATEWAY } from '@/constants'
import { Icons } from '@/themes/_icons'
import {
  getPublicGatewayHrefByHash,
  getShareTelegramHref,
  getShareTwitterHref,
} from '@/utils/gateways'
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
              Name: {name}
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
            <SvgIconCustomized
              component={Icons.LinkAlt}
              sx={{ color: (theme) => theme.palette.blue[500] }}
            ></SvgIconCustomized>
            <Link
              href={`${DEFAULT_GATEWAY}${hash}/?filename=${name}`}
              passHref
              target='_blank'
            >
              <Typography
                variant='body1'
                sx={{
                  ml: 1,
                  color: (theme) => theme.palette.blue[500],
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {truncateAddress(hash ? hash : '')}
              </Typography>
            </Link>
          </ListItemStyled>
          <ListItemStyled>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              flex={1}
              alignItems={'center'}
            >
              <Typography component='span' variant='body1'>
                Size: {formatFileSize(size).size} {formatFileSize(size).unit}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={4}>
                <a
                  target='_blank'
                  href={getShareTelegramHref(
                    '',
                    getPublicGatewayHrefByHash(hash || '')
                  )}
                >
                  <IconButton sx={{ m: 0, p: 0 }}>
                    <SvgIconCustomized
                      component={Icons.Telegram}
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </a>

                <a
                  target='_blank'
                  href={getShareTwitterHref(
                    '',
                    getPublicGatewayHrefByHash(hash || '')
                  )}
                >
                  <IconButton sx={{ m: 0, p: 0 }}>
                    <SvgIconCustomized
                      component={Icons.Twitter}
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </a>
              </Stack>
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
