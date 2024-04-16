import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import {
  TableCellCustomized,
  TableCellStyled,
  TableLoadingCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { Icons } from '@/themes/_icons'
import { truncateAddress } from '@/utils/tools'
import { Stack, Typography } from '@mui/material'
import moment from 'moment'
import { formatEther } from '@/utils/tools'
import CopyClipboardText from '@/components/molecules/copy-text'
import {
  TRANSACTION_HISTORY_HEAD_CELLS,
  TransactionHistoryRowData,
} from './data'
import { breakpoints } from '@/themes/_theme'
type CellProps = {
  row?: TransactionHistoryRowData | null
}
function getTime(time: string) {
  const now = moment()
  const compareTime = moment(time)
  if (now.diff(compareTime, 'minutes') >= 60) {
    return moment(time).format('DD/MM/YYYY')
  } else return moment(time).fromNow()
}
function TransactionHistoryRow(props: CellProps) {
  const { row } = props
  if (!row) {
    return (
      <TableNullCellStyled
        component='th'
        scope='row'
        padding='none'
        sx={{
          height: 0,
          minHeight: 0,
        }}
      ></TableNullCellStyled>
    )
  } else
    return (
      <>
        <TableCellCustomized
          title={TRANSACTION_HISTORY_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
              overflow: 'hidden',
            },
          }}
        >
          <a
            target='_blank'
            href={`https://explorer.aioz.network/tx/${row.evm_tx_hash}`}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
              justifyContent={'flex-start'}
            >
              <Typography variant='body1' textAlign={'left'}>
                {truncateAddress(row.evm_tx_hash)}
              </Typography>
              <SvgIconCustomized
                component={Icons.GoToLink}
                sx={{
                  fontSize: '18px',
                }}
              />
            </Stack>
          </a>
        </TableCellCustomized>
        <TableCellCustomized title={TRANSACTION_HISTORY_HEAD_CELLS[1].label}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography
              variant='body1'
              fontWeight={'inherit'}
              textAlign={'left'}
            >
              {getTime(row.created_at)}
            </Typography>
          </Stack>
        </TableCellCustomized>

        <TableCellCustomized
          title={TRANSACTION_HISTORY_HEAD_CELLS[2].label}
          tableCellProps={{
            sx: {
              [breakpoints.down('md')]: {
                borderBottom: 'none',
              },
            },
          }}
        >
          <Typography variant='body1' textAlign={'left'}>
            {formatEther(row.amount_string)} AIOZ
          </Typography>
        </TableCellCustomized>
      </>
    )
}

export default TransactionHistoryRow
