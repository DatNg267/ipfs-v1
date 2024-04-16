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
import moment from 'moment'
import Link from 'next/link'
import { useContext } from 'react'
import {
  FILE_HEAD_CELLS,
  IpfsFileRow,
  IpfsFilesPageContext,
  StatusFiles,
} from '../resources'
import CellContent from '@/components/organisms/table/cell-content'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { useUpdateFolderInfo } from '@/redux/modal-review-folder/hooks'
import { useUpdateFileInfo } from '@/redux/modal-review-file/hooks'
type CellProps = {
  row?: IpfsFileRow | null
}

const TypoMotion = motion(Typography)

function IpfsFileRow(props: CellProps) {
  const { handleOpenDeleteModal, handleOpenEditModal, fetchDataStatus } =
    useContext(IpfsFilesPageContext)
  const { row } = props
  const handleUpdateFolderInfo = useUpdateFolderInfo()
  const handleUpdateFileInfo = useUpdateFileInfo()
  const handleOpenModalReviewFolder = useOpenModal(
    ApplicationModal.REVIEW_FOLDER
  )
  const handleOpenModalReviewFile = useOpenModal(ApplicationModal.REVIEW_FILE)

  const handleClick = () => {
    if (row && row.is_dir) {
      handleUpdateFolderInfo({
        cid: row.cid,
        folderName: row.name,
        folderSize: row.size,
      })
      handleOpenModalReviewFolder()
    } else if (row && !row.is_dir) {
      handleUpdateFileInfo({
        cid: row.cid,
        name: row.name,
        size: row.size,
      })
      handleOpenModalReviewFile()
    }
  }

  if (!row) {
    return (
      <TableNullCellStyled component={'td'} align='center'>
        <Stack alignItems={'center'}></Stack>
      </TableNullCellStyled>
    )
  } else
    return (
      <>
        <TableCellCustomized
          title={FILE_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
              overflow: 'hidden',
            },
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1}
            overflow={'hidden'}
            justifyContent={'space-between'}
            sx={{
              width: '100%',
              [breakpoints.down('md')]: {
                justifyContent: 'flex-end',
              },
            }}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
              overflow={'hidden'}
            >
              <SvgIconCustomized
                component={row.is_dir ? Icons.Folder : Icons.Document}
              />
              <CellContent>{row.name}</CellContent>
            </Stack>
            <Link href={`${DEFAULT_GATEWAY}${row.cid}`} target='_blank'>
              <IconButton sx={{ py: 0 }}>
                <SvgIconCustomized
                  component={Icons.Eye}
                  sx={{
                    color: 'text.primary',
                  }}
                />
              </IconButton>
            </Link>
          </Stack>
        </TableCellCustomized>
        <TableCellCustomized title={'CID'}>
          <CopyClipboardText
            typoProps={{
              variant: 'body1',
              fontWeight: 'inherit',
              sx: {
                '&:hover': {
                  // color: (theme) => theme.palette.blue[600],
                  // textDecoration: 'underline',
                },
              },
            }}
            copyText={row.cid}
            showText={row.cid ? truncateAddress(row.cid) : ''}
            wrapperProps={{
              justifyContent: 'flex-start',
              textOverflow: 'ellipsis',
            }}
          />
        </TableCellCustomized>

        <TableCellCustomized
          title={FILE_HEAD_CELLS[2].label}
          text={`${row.size ? formatFileSize(row.size).size : '0'}
          ${row.size ? formatFileSize(row.size).unit : 'bytes'}`}
        />

        <TableCellCustomized
          title={FILE_HEAD_CELLS[3].label}
          text={`${getTime(row.date_pinned, undefined, 'hour')}`}
        />

        <TableCellCustomized title={FILE_HEAD_CELLS[4].label}>
          {row.status_pinned === StatusFiles.PINNING ? (
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
                row.status_pinned === StatusFiles.DELETED
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
            alignItems={'center'}
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
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Link href={`${DEFAULT_GATEWAY}${row.cid}`} target='_blank'>
                      <MenuItemStyled>
                        <SvgIconCustomized
                          component={Icons.GoToLink}
                          htmlColor='inherit'
                          sx={{
                            cursor: 'pointer',
                            ml: 2,
                            mr: 2,
                          }}
                        />
                        View URL
                      </MenuItemStyled>
                    </Link>
                    <MenuItemStyled
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${DEFAULT_GATEWAY}${row.cid}`
                        )
                        handleClose()
                      }}
                    >
                      <SvgIconCustomized
                        component={Icons.Copy}
                        htmlColor='inherit'
                        sx={{
                          cursor: 'pointer',
                          ml: 2,
                          mr: 2,
                        }}
                      />
                      Copy URL
                    </MenuItemStyled>
                    {row.pinned && (
                      <>
                        <MenuItemStyled
                          onClick={() => {
                            handleOpenEditModal(row.id, row.metadata)
                            handleClose()
                          }}
                        >
                          <SvgIconCustomized
                            component={Icons.Add}
                            htmlColor='inherit'
                            sx={{
                              cursor: 'pointer',
                              ml: 2,
                              mr: 2,
                            }}
                          />
                          Edit
                        </MenuItemStyled>
                        <MenuItemCustomized
                          type='danger'
                          onClick={() => {
                            handleOpenDeleteModal(row.id)
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
                      </>
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

export default IpfsFileRow
