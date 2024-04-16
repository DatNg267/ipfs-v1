import { Box, Stack } from '@mui/material'
import { times } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DOT_BLUE_CIRCLE_ANIMATION,
  DOT_MINT_CIRCLE_ANIMATION,
  DOT_PINK_CIRCLE_ANIMATION,
  DOT_PURPLE_CIRCLE_ANIMATION,
  DOT_YELLOW_CIRCLE_ANIMATION,
} from './keyframes'
import { keyframes } from '@mui/material'
import { CircleColor } from './types'

const dotPinkCircleKeyframe = keyframes`
  ${DOT_PINK_CIRCLE_ANIMATION}
`
const dotYellowCircleKeyframe = keyframes`
  ${DOT_YELLOW_CIRCLE_ANIMATION}
`
const dotMintCircleKeyframe = keyframes`
  ${DOT_MINT_CIRCLE_ANIMATION}
`

const dotBlueCircleKeyframe = keyframes`
  ${DOT_BLUE_CIRCLE_ANIMATION}
`
const dotPurpleCircleKeyframe = keyframes`
  ${DOT_PURPLE_CIRCLE_ANIMATION}
`
type Props = {}

const Col = ({
  id,
  color = 'pink',
  height,
  delayStart = 3000,
  isActive = false,
  isReverse = false,
}: {
  id: number
  color?: CircleColor
  height: number
  delayStart?: number
  isActive?: boolean
  isReverse?: boolean
}) => {
  const numberCircle = Math.round(height / 24)
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      if (isActive) {
        setAnimate(true)
      }
    }, delayStart)
  }, [delayStart, isActive])

  const animation = useMemo(
    () =>
      color === 'yellow'
        ? dotYellowCircleKeyframe
        : color === 'blue'
        ? dotBlueCircleKeyframe
        : color === 'mint'
        ? dotMintCircleKeyframe
        : color === 'purple'
        ? dotPurpleCircleKeyframe
        : dotPinkCircleKeyframe,
    [color]
  )
  return (
    <Stack>
      {times(numberCircle).map((item, index) => (
        <Box
          sx={{
            border: '1px solid',
            borderRadius: '99px',
            borderColor: '#ccccbd',
            width: '24px',
            height: '24px',
            backgroundColor: 'transparent',
            animation: animate
              ? isReverse
                ? `${animation} 4s ${0.5 * (600 / 24 - index)}s`
                : `${animation} 4s ${0.5 * index}s`
              : ``,
          }}
          onAnimationEnd={(e) => {
            if (isReverse) {
              if (index === 0) {
                setAnimate(false)
                setTimeout(() => {
                  setAnimate(true)
                }, delayStart)
              }
            } else {
              if (index === numberCircle - 1) {
                setAnimate(false)
                setTimeout(() => {
                  setAnimate(true)
                }, delayStart)
              }
            }
          }}
          key={index}
        />
      ))}
    </Stack>
  )
}

export default Col
