import { HeadCell } from '@/components/organisms/table/type'

export const TOPUP_HEAD_CELLS: any[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'DATE',
    enableSort: false,
  },
  {
    id: 'transaction_id',
    numeric: false,
    disablePadding: false,
    label: 'TRANSACTION ID',
    enableSort: false,
  },
  {
    id: 'pay_by',
    numeric: false,
    disablePadding: false,
    label: 'PAY BY',
    enableSort: false,
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'ADDRESS',
    enableSort: false,
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'AMOUNT',
    enableSort: false,
  },
  {
    id: 'credit',
    numeric: false,
    disablePadding: false,
    label: 'CREDIT',
    enableSort: false,
  },
]
export const HISTORY_HEAD_CELLS: any[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'DATE',
    enableSort: false,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'DESCRIPTION',
    enableSort: false,
  },
  {
    id: 'storage_delivery',
    numeric: false,
    disablePadding: false,
    label: 'STORAGE/DELIVERY',
    enableSort: false,
  },
  {
    id: 'total_amount',
    numeric: false,
    disablePadding: false,
    label: 'AMOUNT',
    enableSort: false,
  },
]
export const MONTH_HEAD_CELLS: HeadCell<{
  resource: string
  usage: number
  cost: string
}>[] = [
  {
    id: 'resource',
    numeric: false,
    disablePadding: true,
    label: 'RESOURCE',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: 'unset',
      },
    },
  },
  {
    id: 'usage',
    numeric: false,
    disablePadding: false,
    label: 'USAGE',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: 'unset',
      },
    },
  },
  {
    id: 'cost',
    numeric: false,
    disablePadding: false,
    label: 'COST',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: 'unset',
      },
    },
  },
]
