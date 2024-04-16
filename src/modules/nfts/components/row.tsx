import ButtonMenu from '@/components/atoms/button-menu'
import MenuItemCustomized, {
  MenuItemStyled,
} from '@/components/atoms/menu/MenuItem'
import PopupWrapper from '@/components/atoms/popup-state'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CopyClipboardText from '@/components/molecules/copy-text'
import {
  TableCellCustomized,
  TableCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { DEFAULT_GATEWAY } from '@/constants'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { formatFileSize, getTime, truncateAddress } from '@/utils/tools'
import { Button, IconButton, Popover, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext } from 'react'
import { NFT_HEAD_CELLS, NftRow, NftsPageContext } from '../resources'

type CellProps = {
  row?: NftRow | null
}
const TypoMotion = motion(Typography)
function NftRowComponent(props: CellProps) {
  const { handleOpenUnpinModal } = useContext(NftsPageContext)
  const { row } = props
  if (!row) {
    return (
      <TableNullCellStyled
        component='th'
        scope='row'
        padding='none'
      ></TableNullCellStyled>
    )
  } else
    return (
      <>
        <TableCellCustomized
          title={NFT_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
              // overflow: 'hidden',
            },
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={{ xs: 'flex-end', md: 'space-between' }}
            spacing={2}
            sx={{
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <Typography
              variant='body1'
              fontWeight={'inherit'}
              textAlign={'left'}
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row?.name}{' '}
            </Typography>
            <Link
              href={`${DEFAULT_GATEWAY}${row.metadata_cid}`}
              target='_blank'
            >
              <IconButton sx={{ py: 0 }}>
                <SvgIconCustomized
                  component={Icons.Eye}
                  sx={{
                    color: 'text.primary',
                  }}
                />
              </IconButton>
            </Link>
            {row.status === 'FAILED' && (
              <SvgIconCustomized component={Icons.Warning2}></SvgIconCustomized>
            )}
          </Stack>
        </TableCellCustomized>
        <TableCellCustomized title={NFT_HEAD_CELLS[1].label}>
          <CopyClipboardText
            typoProps={{ variant: 'body1', fontWeight: 'inherit' }}
            copyText={row?.asset_cid}
            showText={row?.asset_cid ? truncateAddress(row.asset_cid) : ''}
            wrapperProps={{
              justifyContent: 'flex-start',
            }}
          />
        </TableCellCustomized>
        <TableCellCustomized title={NFT_HEAD_CELLS[2].label}>
          <CopyClipboardText
            typoProps={{ variant: 'body1', fontWeight: 'inherit' }}
            copyText={row?.metadata_cid}
            showText={
              row?.metadata_cid ? truncateAddress(row.metadata_cid) : ''
            }
            wrapperProps={{
              justifyContent: 'flex-start',
            }}
          />
        </TableCellCustomized>
        <TableCellCustomized title={NFT_HEAD_CELLS[3].label}>
          <Typography variant='body1' fontWeight={'inherit'}>
            {row?.size ? formatFileSize(row.size).size : '0'}{' '}
            {row?.size ? formatFileSize(row.size).unit : 'bytes'}
          </Typography>
        </TableCellCustomized>
        <TableCellCustomized
          title={NFT_HEAD_CELLS[4].label}
          text={`${getTime(row?.created_at, undefined, 'hour')}`}
        />

        <TableCellCustomized title={NFT_HEAD_CELLS[5].label}>
          {row.status_pinned === 'Pending' ? (
            <TypoMotion
              variant='body1'
              fontWeight={'inherit'}
              initial={{ opacity: 0, color: 'white' }}
              animate={{ opacity: 1, color: 'black' }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: 'linear',
                repeatType: 'reverse',
              }}
            >
              {row.status_pinned}
            </TypoMotion>
          ) : (
            <Typography
              variant='body1'
              fontWeight={'inherit'}
              color={
                row.status_pinned === 'Unpinned'
                  ? 'text.secondary'
                  : 'text.primary'
              }
            >
              {row.status_pinned}
            </Typography>
          )}
        </TableCellCustomized>
        <TableCellStyled
          sx={{
            [breakpoints.down('md')]: {
              borderBottom: 'none',
            },
          }}
        >
          <Stack
            alignItems={'flex-end'}
            sx={{
              [breakpoints.up('md')]: {
                alignItems: 'flex-end',
              },
              [breakpoints.down('md')]: {
                width: '100%',
              },
            }}
          >
            <PopupWrapper>
              {({ handleClick, open, anchorEl, handleClose }) => (
                <>
                  <ButtonMenu
                    onClick={handleClick}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      p: 0,
                    }}
                  />
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      width: '100%',
                    }}
                  >
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={handleClick}
                      sx={{
                        width: 'fit-content',
                        m: 0,
                        px: { xs: '16px' },
                      }}
                    >
                      Action
                    </Button>
                  </Stack>
                  <Popover
                    open={open}
                    keepMounted
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Link
                      href={`${DEFAULT_GATEWAY}${row.asset_cid}`}
                      target='_blank'
                    >
                      <MenuItemStyled>
                        <Stack direction={'row'} alignItems={'center'}>
                          <SvgIconCustomized
                            component={Icons.GoToLink}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          View asset
                        </Stack>
                      </MenuItemStyled>
                    </Link>
                    <Link
                      href={`${DEFAULT_GATEWAY}${row.metadata_cid}`}
                      target='_blank'
                    >
                      <MenuItemStyled>
                        <Stack direction={'row'} alignItems={'center'}>
                          <SvgIconCustomized
                            component={Icons.GoToLink}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          View metadata
                        </Stack>
                      </MenuItemStyled>
                    </Link>
                    {row.pinned && (
                      <MenuItemCustomized
                        type='danger'
                        onClick={() => {
                          handleOpenUnpinModal(row.id)
                          handleClose()
                        }}
                      >
                        <SvgIconCustomized
                          component={Icons.Delete}
                          htmlColor='inherit'
                          sx={{
                            cursor: 'pointer',
                            ml: 2,
                            mr: 2,
                          }}
                        />
                        Unpin
                      </MenuItemCustomized>
                    )}
                  </Popover>
                </>
              )}
            </PopupWrapper>
          </Stack>
        </TableCellStyled>
      </>
    )
}

export default NftRowComponent
