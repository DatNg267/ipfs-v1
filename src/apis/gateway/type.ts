import { Gateways } from '@/types/gateways'

export type GetGatewaysByHashRequest = {}
export type GetGatewaysByHashResponse = {
  status: string
  data: any
}
export type TypeGateway = 'Public' | 'Dedicated' | 'all'
export type GetGatewaysRequest = {
  offset: number
  limit: number
  type?: TypeGateway
}
export type GetGatewaysResponse = {
  status: string
  data: {
    totals: number
    gateways: Gateways
  }
}

export type SubcribeGatewaysRequest = {}
export type SubcribeGatewaysResponse = {
  status: string
  data: any
}

export type UnsubcribeGatewaysRequest = {}
export type UnsubcribeGatewaysResponse = {
  status: string
  message: string
}

export type GetStatusSubcribeGatewaysRequest = {}
export type GetStatusSubcribeGatewaysResponse = {
  status: string
  data: {
    user_id: string
    created_at: string
  }
}
