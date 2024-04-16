import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import {
  getPublicGatewayHrefByHash,
  getShareTelegramHref,
  getShareTwitterHref,
} from '@/utils/gateways'
import { formatFileSize } from '@/utils/tools'
import {
  IconButton,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  styled,
} from '@mui/material'

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginTop: '8px',
}))
type Props = {
  hash?: string
  name?: string
  size?: number
  totalFiles?: number
}
const FolderInfo = ({ totalFiles, hash, name, size }: Props) => {
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
              Name: <span style={{ fontWeight: 600 }}>{name}</span>
            </Typography>
          </ListItemStyled>
          <ListItemStyled>
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
              Total files: <span style={{ fontWeight: 600 }}>{totalFiles}</span>
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

export default FolderInfo
