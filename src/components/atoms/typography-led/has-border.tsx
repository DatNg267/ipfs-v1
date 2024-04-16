import {
  SvgIconProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material'

import { ReactNode, memo } from 'react'

type TypoLedHasBorderProps = {
  arrColor: string[]
  children: ReactNode
  startColor: number
} & TypographyProps &
  any
const TypoLedHasBorder = ({
  children,
  arrColor,
  startColor,
  ...props
}: TypoLedHasBorderProps) => {
  const generateColor = (index: number) => {
    const length = arrColor.length
    if (index > length - 1) {
      return index - length
    } else return index
  }
  const TypoLedHasBorderStyled = styled(Typography)((theme) => ({
    border: '1px solid',
    borderRadius: '50px',

    [`@keyframes changeColor${startColor}`]: {
      '0%': {
        borderColor: arrColor[generateColor(startColor)],
        color: arrColor[generateColor(startColor)],
      },
      '25%': {
        borderColor: arrColor[generateColor(startColor + 1)],
        color: arrColor[generateColor(startColor + 1)],
      },
      '50%': {
        borderColor: arrColor[generateColor(startColor + 2)],
        color: arrColor[generateColor(startColor + 2)],
      },
      '75%': {
        borderColor: arrColor[generateColor(startColor + 3)],
        color: arrColor[generateColor(startColor + 3)],
      },
      '100%': {
        borderColor: arrColor[generateColor(startColor + 4)],
        color: arrColor[generateColor(startColor + 4)],
      },
    },
    animation: `changeColor${startColor} 1.5s infinite alternate-reverse linear`,
  }))
  return <TypoLedHasBorderStyled {...props}>{children}</TypoLedHasBorderStyled>
}
export default memo(TypoLedHasBorder)
