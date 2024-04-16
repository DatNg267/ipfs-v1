import { AppRouter } from '@/constants'
import { colorTheme } from '@/themes/_color'

export const DASHBOARD_NAVBAR_HREF = [
  {
    title: 'IPFS Files',
    href: AppRouter.IPFS_FILES,
    rawhref: AppRouter.IPFS_FILES,
    color: colorTheme.general.dotMint[500],
  },
  {
    title: 'NFTs',
    href: AppRouter.NFTS,
    rawhref: AppRouter.NFTS,
    color: colorTheme.general.dotBlue[500],
  },
  {
    title: 'Gateways',
    href: AppRouter.GATEWAYS,
    rawhref: AppRouter.GATEWAYS,
    color: colorTheme.general.dotPurple[500],
  },
  // {
  //   title: 'Documentation',
  //   href: AppRouter.DOCUMENT,
  //   rawhref: AppRouter.DOCUMENT,
  //   color: colorTheme.general.dotPink[500],
  // },
  {
    title: 'API Keys',
    href: AppRouter.API_KEY,
    rawhref: AppRouter.API_KEY,
    color: colorTheme.general.dotOrange[500],
  },
  {
    title: 'Payment',
    href: AppRouter.PAYMENT + '?tag=history-usage',
    rawhref: AppRouter.PAYMENT,
    color: colorTheme.general.dotYellow[500],
  },
]
