import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import CopyClipboardText from '@/components/molecules/copy-text'
import CellContent from '@/components/organisms/table/cell-content'
import {
  TableCellCustomized,
  TableCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { Icons } from '@/themes/_icons'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import {
  API_KEYS_HEAD_CELLS,
  ApiKeysPageContext,
  ApiKeysRow,
} from '../resources'
import { getTime } from '@/utils'
type CellProps = {
  row?: ApiKeysRow | null
}

const DEFAULT_NAME = 'Default'

function ApiKeysCell(props: CellProps) {
  const { handleOpenRevokeModal } = useContext(ApiKeysPageContext)
  const { row } = props
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
          title={API_KEYS_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
              // overflow: 'hidden',
            },
          }}
        >
          <CellContent>{row.name}</CellContent>
        </TableCellCustomized>
        <TableCellCustomized title={API_KEYS_HEAD_CELLS[1].label}>
          <CopyClipboardText
            typoProps={{ variant: 'body1', fontWeight: 'inherit' }}
            copyText={row.apiKey}
            showText={row.apiKey}
            wrapperProps={{
              justifyContent: 'flex-start',
            }}
          />
        </TableCellCustomized>
        <TableCellCustomized title={API_KEYS_HEAD_CELLS[2].label}>
          <Typography variant='body1' fontWeight={'inherit'}>
            {row.secretKey}
          </Typography>
        </TableCellCustomized>
        <TableCellCustomized title={API_KEYS_HEAD_CELLS[3].label}>
          <CellContent>
            {' '}
            {getTime(row.date, 'DD/MM/YYYY, hh:mm A', 'hour')}
          </CellContent>
        </TableCellCustomized>
        <TableCellStyled
          sx={{
            borderBottom: { xs: 'none', md: '1px solid' },
          }}
        >
          <Stack
            alignItems={'flex-end'}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <IconButton
              sx={{
                border: '2px solid',
                borderColor: (theme) => theme.palette.red[500],
                borderRadius: '99px',
                width: 'fit-content',
                p: 1 / 2,
                ...(row.name === DEFAULT_NAME && {
                  color: (theme) => theme.palette.baseGray[500],
                  borderColor: (theme) => theme.palette.baseGray[500],
                }),
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.red[500],
                  borderRadius: '99px',
                  border: '2px solid',
                  borderColor: (theme) => theme.palette.red[500],
                  '& .MuiSvgIcon-root path': {
                    fill: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.main,
                  },
                  '& .MuiSvgIcon-root rect': {
                    stroke: (theme) => theme.palette.baseGray[1000],
                  },
                },
              }}
              onClick={() => {
                if (row.name && row.id) {
                  handleOpenRevokeModal(row.id, row.name)
                } else {
                  // toast error
                }
              }}
              disabled={row.name === DEFAULT_NAME}
            >
              <SvgIconCustomized
                sx={{
                  fontSize: '23px',
                  color: (theme) => theme.palette.red[500],
                  ...(row.name === DEFAULT_NAME && {
                    color: (theme) => theme.palette.baseGray[500],
                    borderColor: (theme) => theme.palette.baseGray[500],
                  }),
                }}
                component={Icons.Delete}
              />
            </IconButton>
          </Stack>
          <Stack
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
            }}
            alignItems={'center'}
          >
            <Button
              disabled={row.name === DEFAULT_NAME}
              onClick={() => {
                if (row.name && row.id) {
                  handleOpenRevokeModal(row.id, row.name)
                } else {
                }
              }}
              sx={{
                width: 'fit-content',
                borderColor: (theme) => theme.palette.red[600],
                color: (theme) => theme.palette.red[600],
                padding: { xs: '4px 16px' },
              }}
              variant='outlined'
            >
              Revoke
            </Button>
          </Stack>
        </TableCellStyled>
      </>
    )
}

export default ApiKeysCell
