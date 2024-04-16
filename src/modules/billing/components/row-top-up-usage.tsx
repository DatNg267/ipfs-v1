import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import {
  TableCellCustomized,
  TableCellStyled,
  TableLoadingCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { Icons } from '@/themes/_icons'
import { fixedNumber, truncateAddress } from '@/utils/tools'
import { Stack, Typography } from '@mui/material'
import moment from 'moment'
import { formatEther } from '@/utils/tools'
import CopyClipboardText from '@/components/molecules/copy-text'
import { TopUpUsageRowData } from '../resources/types'
import { TOPUP_HEAD_CELLS } from '../resources/data'
import { breakpoints } from '@/themes/_theme'
type CellProps = {
  row?: TopUpUsageRowData | null
}

function TopUpUsageRow(props: CellProps) {
  const { row } = props
  if (!row) {
    return (
      <>
        {TOPUP_HEAD_CELLS.map((item, index) => (
          <TableNullCellStyled
            key={index}
            component='td'
            scope='row'
            padding='none'
          ></TableNullCellStyled>
        ))}
      </>
    )
  } else
    return (
      <>
        <TableCellCustomized
          title={TOPUP_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
            },
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography
              variant='body1'
              fontWeight={'inherit'}
              textAlign={'left'}
            >
              {moment(row.created_at).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
        </TableCellCustomized>
        <TableCellCustomized title={TOPUP_HEAD_CELLS[1].label}>
          <a
            target='_blank'
            href={`https://explorer.aioz.network/tx/${
              row.evm_tx_hash || row.cosmos_tx_hash
            }`}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
              justifyContent={'flex-start'}
            >
              <Typography variant='body1' textAlign={'left'}>
                {truncateAddress(row.evm_tx_hash || row.cosmos_tx_hash)}
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

        <TableCellCustomized title={TOPUP_HEAD_CELLS[2].label}>
          <CopyClipboardText
            copyText={row.sender}
            showText={truncateAddress(row.sender)}
          />
        </TableCellCustomized>
        <TableCellCustomized title={TOPUP_HEAD_CELLS[3].label}>
          <CopyClipboardText
            copyText={row.sender}
            showText={truncateAddress(row.recipient)}
          />
        </TableCellCustomized>
        <TableCellCustomized title={TOPUP_HEAD_CELLS[4].label}>
          <Typography variant='body1' textAlign={{ xs: 'right', md: 'left' }}>
            {formatEther(row.amount_string)} AIOZ
          </Typography>
        </TableCellCustomized>
        <TableCellCustomized
          tableCellProps={{
            sx: {
              [breakpoints.down('md')]: {
                borderBottom: 'none',
              },
            },
          }}
          title={TOPUP_HEAD_CELLS[5].label}
        >
          <Typography variant='body1' textAlign={{ xs: 'right', md: 'left' }}>
            ${fixedNumber(formatEther(row.credit))}
          </Typography>
        </TableCellCustomized>
      </>
    )
}

export default TopUpUsageRow
