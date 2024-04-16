import {
  TableCellCustomized,
  TableCellStyled,
  TableLoadingCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { fixedNumber, formatEther } from '@/utils/tools'
import { Stack, Typography } from '@mui/material'
import moment from 'moment'
import { HistoryUsageRowData } from '../resources/types'
import { HISTORY_HEAD_CELLS } from '../resources/data'
import { breakpoints } from '@/themes/_theme'

type CellProps = {
  row?: HistoryUsageRowData | null
}

function HistoryUsageRow(props: CellProps) {
  const { row } = props

  const getCost = () => {
    try {
      return fixedNumber(
        row?.total_amount ? formatEther(row.total_amount) : '0'
      )
    } catch (error) {
      return '0'
    }
  }
  const cost = getCost()
  if (!row) {
    return (
      <>
        {HISTORY_HEAD_CELLS.map((item, index) => (
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
          title={HISTORY_HEAD_CELLS[0].label}
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
              {moment(row.date).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
        </TableCellCustomized>
        <TableCellCustomized title={HISTORY_HEAD_CELLS[1].label}>
          <Typography variant='body1' textAlign={{ xs: 'right', md: 'left' }}>
            AIOZ Web3 Storage for {moment(row.date).format('MM/YYYY')}
          </Typography>
        </TableCellCustomized>

        <TableCellCustomized title={HISTORY_HEAD_CELLS[2].label}>
          <Typography variant='body1' textAlign={{ xs: 'right', md: 'left' }}>
            {row.storage_delivery}
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
          title={HISTORY_HEAD_CELLS[3].label}
        >
          <Typography variant='body1' textAlign={{ xs: 'right', md: 'left' }}>
            ${cost}
          </Typography>
        </TableCellCustomized>
      </>
    )
}

export default HistoryUsageRow
