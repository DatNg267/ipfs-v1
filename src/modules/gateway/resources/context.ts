import { Gateways } from '@/types/gateways'
import { createContext } from 'react'
import { SpeedMonitor } from '../components/speed-monitor'

type GatewaysPageContextProps = {
  handleRefreshList: () => void
  subcribe: boolean
  gateways: Gateways | null
  speedMonitor: SpeedMonitor
  handleChangeSpeedMonitor: (isFast: boolean) => void
}
export const GatewaysPageContext = createContext<GatewaysPageContextProps>({
  handleRefreshList: () => {},
  subcribe: false,
  gateways: null,
  speedMonitor: 'low',
  handleChangeSpeedMonitor: (isFast: boolean) => {},
})
