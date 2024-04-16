export const BASE_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN
export enum AppRouter {
  DASHBOARD = '/dashboard',
  HOME = '/',
  REGISTER = '/auth/register',
  VERIFY_EMAIL = '/auth/verifyemail',
  RESEND_MAIL = '/auth/resend-email',
  LOGIN = '/auth/login',
  FORGOT_PASSWORD = '/auth/forgot-password',
  RESET_PASSWORD = '/auth/reset-password',
  IPFS_FILES = '/dashboard/ipfs-files',
  NFTS = '/dashboard/nfts',
  GATEWAYS = '/dashboard/gateways',
  DOCUMENT = '/docs',
  DOCUMENT_GET_STARTED = '/docs/quick-start',
  API_KEY = '/dashboard/api-keys',
  PAYMENT = '/dashboard/payment',
  PAYMENT_TAB = '/dashboard/payment?tag=history-usage',
  PAYMENT_TAB_TOP_UP = '/dashboard/payment?tag=history-usage&openTopUp=true',
  ABOUT = '/about',
  PROFILE = '/dashboard/profile',
  SETTING = '/setting',
  TEST = '/test',
}
export const PUBLIC_ROUTERS = [
  '/test',
  '/',
  AppRouter.DOCUMENT,
  '/styles-guide',
  AppRouter.LOGIN,
  AppRouter.REGISTER,
  AppRouter.FORGOT_PASSWORD,
  AppRouter.RESET_PASSWORD,
  AppRouter.VERIFY_EMAIL,
  AppRouter.RESEND_MAIL,
]
export const PREVENT_ROUTERS_WHEN_LOGGED = [
  AppRouter.LOGIN,
  AppRouter.REGISTER,
  AppRouter.FORGOT_PASSWORD,
  AppRouter.RESET_PASSWORD,
  AppRouter.RESEND_MAIL,
  // AppRouter.VERIFY_EMAIL,
]
export const ROUTERS_CAN_NOT_PUSH_DIRECTLY = ['']
export enum ProtectRouterStatus {
  VALID,
  INVALID,
}
