import { HeadCell } from '@/components/organisms/table/type'
import { NftRow } from './types'

export const NFT_HEAD_CELLS: HeadCell<NftRow>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    enableSort: true,
    tableCellProps: {
      sx: {
        width: '30%',
      },
    },
  },
  {
    id: 'asset_cid',
    numeric: false,
    disablePadding: false,
    label: 'Asset CID',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: '15%',
      },
    },
  },
  {
    id: 'metadata_cid',
    numeric: false,
    disablePadding: false,
    label: 'Metadata CID',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: '15%',
      },
    },
  },
  {
    id: 'size',
    numeric: false,
    disablePadding: false,
    label: 'Size',
    enableSort: true,
    tableCellProps: {
      sx: {
        width: '10%',
      },
    },
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    enableSort: true,
    tableCellProps: {
      sx: {
        width: '20%',
      },
    },
  },
  {
    id: 'status_pinned',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    enableSort: false,
    tableCellProps: {
      sx: {
        width: '10%',
      },
    },
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
    enableSort: false,
    align: 'right',
    tableCellProps: {
      sx: {
        width: '10%',
      },
    },
  },
]
