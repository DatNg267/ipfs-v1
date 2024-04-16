import { HeadCell } from '@/components/organisms/table/type'
import { GatewayRow } from './types'

export const GATEWAY_HEADER_CELLS: HeadCell<GatewayRow & { active: any }>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    enableSort: false,
    cellWidth: '150px',
  },
  {
    id: 'host',
    numeric: false,
    disablePadding: false,
    label: 'Gateway',
    enableSort: false,
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
    enableSort: false,
    cellWidth: '100px',
  },
  {
    id: 'operation',
    numeric: false,
    disablePadding: false,
    label: 'Operation',
    enableSort: false,
    cellWidth: '100px',
  },
  {
    id: 'bandwidth',
    numeric: false,
    disablePadding: false,
    label: 'Bandwidth',
    enableSort: false,
    cellWidth: '100px',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Active',
    enableSort: false,
    cellWidth: '70px',
    align: 'center',
  },
]

export const DEDICATE_GATEWAYS_CONTENT = [
  'High bandwidth: ~ 100MB/s',
  'Unlimited Pinned Files',
  'Dedicated Resources',
  'Load Balancing with Multiple Gateways',
  'Low Latency with Built-in CDN',
  'Smart Caching & Routing',
  'Data Replication',
]

export const PUBLIC_GATEWAYS_CONTENT = [
  'Limited Bandwidth: Up to 5 MB/s',
  'Limited Pinned Files: 500',
  'Shared resources with other users',
  'Standard Latency',
]
