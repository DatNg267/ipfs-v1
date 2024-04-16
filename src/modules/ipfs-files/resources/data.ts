import { HeadCell } from '@/components/organisms/table/type'
import { FileStatus, IpfsFileRow } from './types'

export const FILE_HEAD_CELLS: HeadCell<IpfsFileRow & { action: string }>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    enableSort: true,
    align: 'left',
    tableCellProps: {
      sx: {
        width: '40%',
      },
    },
  },
  {
    id: 'cid',
    numeric: false,
    disablePadding: false,
    label: 'Content Identifier (CID)',
    enableSort: false,
    align: 'left',
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
    id: 'date_pinned',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    enableSort: true,
    tableCellProps: {
      sx: {
        width: '15%',
      },
    },
  },
  {
    id: 'status_pinned',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    enableSort: false,
    cellWidth: '100px',
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
    cellWidth: '100px',
    align: 'right',
    tableCellProps: {
      sx: {
        width: '10%',
      },
    },
  },
]

export const FILE_PENDING_STATUS = [
  FileStatus.PENDING,
  FileStatus.PROCESSING_RETRIEVAL,
  FileStatus.PROCESSING,
  FileStatus.RETRIEVAL,
]
