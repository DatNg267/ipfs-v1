import {
  TableCellCustomized,
  TableCellStyled,
  TableLoadingCellStyled,
  TableNullCellStyled,
} from '@/components/organisms/table/cell'
import { fixedNumber, formatFileSize } from '@/utils/tools'
import { Stack, Typography } from '@mui/material'
import { formatEther } from '@/utils/tools'
import { ThisMonthRowData } from '../resources/types'
import { MONTH_HEAD_CELLS } from '../resources/data'
import { breakpoints } from '@/themes/_theme'

type CellProps = {
  row?: ThisMonthRowData | null
}
function BillingMonthUsageRow(props: CellProps) {
  const { row } = props

  const getCost = () => {
    try {
      return fixedNumber(row?.cost ? formatEther(row.cost) : '0')
    } catch (error) {
      return 0
    }
  }

  if (!row) {
    return (
      <TableNullCellStyled
        component='th'
        scope='row'
        padding='none'
        sx={{
          height: 0,
          minHeight: 0,
          p: 0,
          m: 0,
          border: 'none',
        }}
      ></TableNullCellStyled>
    )
  } else
    return (
      <>
        <TableCellCustomized
          title={MONTH_HEAD_CELLS[0].label}
          tableCellProps={{
            sx: {
              paddingLeft: '28px',
              minHeight: '44px',
              height: '44px',
              py: 2,
            },
          }}
        >
          {' '}
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant='body1' textAlign={'left'}>
              {row.resource}
            </Typography>
          </Stack>
        </TableCellCustomized>

        <TableCellCustomized
          title={MONTH_HEAD_CELLS[1].label}
          tableCellProps={{
            sx: {
              minHeight: '44px',
              height: '44px',
              py: 2,
            },
          }}
        >
          <Typography variant='body1' textAlign={'left'}>
            {formatFileSize(row.usage).size} {formatFileSize(row.usage).unit}
          </Typography>
        </TableCellCustomized>
        <TableCellCustomized
          title={MONTH_HEAD_CELLS[2].label}
          tableCellProps={{
            sx: {
              minHeight: '44px',
              height: '44px',
              py: 2,
              [breakpoints.down('md')]: {
                borderBottom: 'none',
              },
            },
          }}
        >
          <Typography variant='body1' textAlign={'left'}>
            ${getCost()}
          </Typography>
        </TableCellCustomized>
      </>
    )
}

export default BillingMonthUsageRow
