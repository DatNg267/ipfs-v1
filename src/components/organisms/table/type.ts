import { TableCellProps } from '@mui/material'

export type HeadCell<T> = {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  enableSort: boolean
  tableCellProps?: {} & TableCellProps
  cellWidth?: string
  align?: 'left' | 'right' | 'center'
}
