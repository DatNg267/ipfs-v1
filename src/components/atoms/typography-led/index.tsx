import {
  SvgIconProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material'

import { ReactNode, memo } from 'react'
import { SvgIconCustomized } from '../svg-icon'

type TypographyColorAnimateProps = {
  arrColor: string[]
  children: ReactNode
  startColor: number
} & TypographyProps
export const TypographyColorAnimate = memo(
  ({
    children,
    arrColor,
    startColor,
    ...props
  }: TypographyColorAnimateProps) => {
    const generateColor = (index: number) => {
      const length = arrColor.length
      if (index > length - 1) {
        return index - length
      } else return index
    }

    const TypographyColor = styled(Typography)((theme) => ({
      [`@keyframes changeColor${startColor}`]: {
        '0%': {
          color: arrColor[generateColor(startColor)],
        },
        '25%': {
          color: arrColor[generateColor(startColor + 1)],
        },
        '50%': {
          color: arrColor[generateColor(startColor + 2)],
        },
        '75%': {
          color: arrColor[generateColor(startColor + 3)],
        },
        '100%': {
          color: arrColor[generateColor(startColor + 4)],
        },
      },
      animation: `changeColor${startColor} 1.5s infinite alternate-reverse linear`,
    }))
    return <TypographyColor {...props}>{children}</TypographyColor>
  }
)

type SvgIconAnimateColorProps = {
  arrColor: string[]
  startColor: number
  [key: string]: any
} & SvgIconProps
export const SvgIconAnimateColor = ({
  arrColor,
  startColor,
  ...props
}: SvgIconAnimateColorProps) => {
  const generateColor = (index: number) => {
    const length = arrColor.length
    if (index > length - 1) {
      return index - length
    } else return index
  }

  const SvgIconCustomizedAnimateColor = styled(SvgIconCustomized)((theme) => ({
    color: 'inherit',
    [`@keyframes changeColor${startColor}`]: {
      '0%': {
        color: arrColor[generateColor(startColor)],
      },
      '25%': {
        color: arrColor[generateColor(startColor + 1)],
      },
      '50%': {
        color: arrColor[generateColor(startColor + 2)],
      },
      '75%': {
        color: arrColor[generateColor(startColor + 3)],
      },
      '100%': {
        color: arrColor[generateColor(startColor + 4)],
      },
    },
    animation: `changeColor${startColor} 1.5s infinite alternate-reverse linear`,
  }))
  return (
    <SvgIconCustomizedAnimateColor {...props}></SvgIconCustomizedAnimateColor>
  )
}
