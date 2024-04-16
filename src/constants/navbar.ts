import { AppRouter } from '@/constants'
import { colorTheme } from '@/themes/_color'
export const PUBLIC_NAVBAR_HREF = [
  { title: 'Demo', href: '/#demo' },
  { title: 'Features', href: '/#features' },
  { title: 'Pricing', href: '/#pricing' },
  { title: 'FAQ', href: '/#faq' },
  { title: 'Documentation', href: AppRouter.DOCUMENT },
]
export const DASHBOARD_NAVBAR_MOBILE_HREF = [
  {
    title: 'IPFS Files',
    href: AppRouter.IPFS_FILES,
    rawhref: AppRouter.IPFS_FILES,
    color: colorTheme.general.dotMint[600],
  },
  {
    title: 'NFTs',
    href: AppRouter.NFTS,
    rawhref: AppRouter.NFTS,
    color: colorTheme.general.dotBlue[600],
  },
  {
    title: 'Gateways',
    href: AppRouter.GATEWAYS,
    rawhref: AppRouter.GATEWAYS,
    color: colorTheme.general.dotPurple[600],
  },
  {
    title: 'API Keys',
    href: AppRouter.API_KEY,
    rawhref: AppRouter.API_KEY,
    color: colorTheme.general.dotOrange[600],
  },
  {
    title: 'Payment',
    href: AppRouter.PAYMENT + '?tag=month-usage',
    rawhref: AppRouter.PAYMENT,
    color: colorTheme.general.dotYellow[600],
  },
  {
    title: 'Profile',
    href: AppRouter.PROFILE,
    rawhref: AppRouter.PROFILE,
    color: colorTheme.general.dotCoban[600],
  },
]
