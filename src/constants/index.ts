import { colorTheme } from '@/themes/_color'
export * from './routers'
export * from './layout'

export const ARR_COLOR = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000,
]
export const DEFAULT_FETCH_LIMIT = 10
export const DEFAULT_TYPOGRAPHY_ARRAY_COLOR = [
  colorTheme.general.dotPink[500],
  colorTheme.general.dotBlue[500],
  colorTheme.light.primary[500],
  colorTheme.general.dotYellow[500],
  colorTheme.general.dotMint[500],
]

export const FILES_FORMAT_SUPPORTED = [
  '.png',
  '.gif',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.json',
  '.tff',
  '.otf',
]
export const DEFAULT_GATEWAY = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY
export const DEFAULT_RESEND_EMAIL_TIME = 60
export const DEFAULT_AUTO_REDICRECT = 15000
export const PAY_DATA = {
  Storage: {
    id: 'storage',
    maxMonth: 12,
    pricePerMonth: 4,
    title: 'Estimated Monthly Storage',
    subTitle: '(4$ / 1TB)',
    defaultValue: 2,
  },
  DeliveryBandwidth: {
    id: 'deliveryBandwidth',
    maxMonth: 12,
    pricePerMonth: 7,
    title: 'Estimated Monthly Delivery Bandwidth',
    subTitle: '( 7$ / 1TB )',
    defaultValue: 2,
  },
}

export const SOCIAL_GITHUB_LINK = 'https://github.com/AIOZNetwork'
export const SOCIAL_TELEGRAM_LINK = 'https://t.me/s/aiozofficial'
export const SOCIAL_TWITTER_LINK = 'https://twitter.com/AIOZNetwork'
