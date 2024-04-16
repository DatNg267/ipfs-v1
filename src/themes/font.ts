import { createTheme } from '@mui/material/styles'
import localFont from 'next/font/local'

export const arrayFont = localFont({
  src: [
    {
      path: '../../public/fonts/array/Array-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/array/Array-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/array/Array-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/array/Array-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})
export const clashCroteskFont = localFont({
  src: [
    {
      path: '../../public/fonts/clashcrotesk/ClashGrotesk-Light.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/clashcrotesk/ClashGrotesk-Regular.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/clashcrotesk/ClashGrotesk-Medium.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/clashcrotesk/ClashGrotesk-Semibold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash-crotesk',
})
export const {
  typography: { pxToRem },
} = createTheme()

export const fontSize = {
  326: {
    fontSize: '326px',
    lineHeight: '374.9px',
  },
  160: {
    fontSize: '160px',
    lineHeight: '172px',
  },
  96: {
    fontSize: pxToRem(96),
    lineHeight: '108px',
  },
  60: {
    fontSize: pxToRem(60),
    lineHeight: '72px',
  },
  48: {
    fontSize: pxToRem(48),
    lineHeight: '56px',
  },
  40: {
    fontSize: pxToRem(40),
    lineHeight: '46px',
  },
  34: {
    fontSize: pxToRem(34),
    lineHeight: '44px',
  },
  32: {
    fontSize: pxToRem(32),
    lineHeight: '48px',
  },
  26: {
    fontSize: pxToRem(26),
    lineHeight: '36px',
  },
  24: {
    fontSize: pxToRem(24),
    lineHeight: '36px',
  },
  20: {
    fontSize: pxToRem(20),
    lineHeight: '28px',
  },
  18: {
    fontSize: pxToRem(18),
    lineHeight: '28px',
  },
  16: {
    fontSize: pxToRem(16),
    lineHeight: '24px',
  },
  14: {
    fontSize: pxToRem(14),
    lineHeight: '24px',
  },
  12: {
    fontSize: pxToRem(12),
    lineHeight: '20px',
  },
  11: {
    fontSize: pxToRem(11),
    lineHeight: '16px',
  },
}
