import { DEFAULT_TYPOGRAPHY_ARRAY_COLOR } from '@/constants'
import { colorTheme } from './_color'
import { keyframes } from '@emotion/react'

export const AppAnimation = {
  Led: {
    [`@keyframes led-text`]: {
      '0%': {
        color: DEFAULT_TYPOGRAPHY_ARRAY_COLOR[0],
      },
      '25%': {
        color: DEFAULT_TYPOGRAPHY_ARRAY_COLOR[1],
      },
      '50%': {
        color: DEFAULT_TYPOGRAPHY_ARRAY_COLOR[2],
      },
      '75%': {
        color: DEFAULT_TYPOGRAPHY_ARRAY_COLOR[3],
      },
      '100%': {
        color: DEFAULT_TYPOGRAPHY_ARRAY_COLOR[4],
      },
    },
  },
  LoadingText: {
    ['@keyframes loading-text']: {
      '0%': {
        backgroundPosition: 'right bottom',
      },
      '100%': {
        backgroundPosition: 'left bottom',
      },
    },
  },
}

const colorToggle = {
  '0%': {
    color: colorTheme.general.dotPink[500],
  },
  '25%': {
    color: colorTheme.general.dotBlue[500],
  },
  '50%': {
    color: colorTheme.general.dotYellow[500],
  },
  '75%': {
    color: colorTheme.general.dotMint[500],
  },
  '100%': {
    color: colorTheme.general.dotPurple[500],
  },
}
export const colorToggleKeyframes = keyframes`
 ${colorToggle}
`

const backgroundToggle = {
  '0%': {
    backgroundColor: colorTheme.general.dotPink[700],
  },
  '25%': {
    backgroundColor: colorTheme.general.dotBlue[700],
  },
  '50%': {
    backgroundColor: colorTheme.general.dotYellow[700],
  },
  '75%': {
    backgroundColor: colorTheme.general.dotMint[700],
  },
  '100%': {
    backgroundColor: colorTheme.general.dotPurple[700],
  },
}
export const backgroundToggleKeyframes = keyframes`
 ${backgroundToggle}
`
