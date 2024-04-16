import { HeadCell } from '@/components/organisms/table/type'
import { ApiKeysRow } from './types'

export const API_KEYS_HEAD_CELLS: HeadCell<ApiKeysRow>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    enableSort: false,
  },
  {
    id: 'apiKey',
    numeric: false,
    disablePadding: false,
    label: 'API Key',
    enableSort: false,
  },
  {
    id: 'secretKey',
    numeric: false,
    disablePadding: false,
    label: 'API Secret',
    enableSort: false,
    cellWidth: '100px',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    enableSort: false,
    cellWidth: '130px',
  },
  {
    id: 'revoke',
    numeric: false,
    disablePadding: false,
    label: 'Revoke',
    enableSort: false,
    cellWidth: '70px',
    align: 'right',
  },
]
