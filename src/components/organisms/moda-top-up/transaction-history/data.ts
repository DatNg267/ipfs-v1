import { TopUpUsage } from '@/types/billing'

export type TransactionHistoryRowData = TopUpUsage & {
  amount_string: string
}
export const TRANSACTION_HISTORY_HEAD_CELLS: any[] = [
  {
    id: 'transaction_id',
    numeric: false,
    disablePadding: false,
    label: 'TRANSACTION ID',
    enableSort: false,
    cellWidth: '180px',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'DATE',
    enableSort: false,
    cellWidth: '150px',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'AMOUNT',
    enableSort: false,
    cellWidth: '150px',
  },
]
