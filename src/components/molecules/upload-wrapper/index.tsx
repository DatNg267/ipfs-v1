import { useAppSelector } from '@/redux/hooks'
import { useStartAnimateLoading } from '@/redux/upload-wrapper/hooks'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import {
  Box,
  Paper,
  Stack,
  keyframes,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { times } from 'lodash'
import { ReactNode, memo, useEffect, useMemo, useRef, useState } from 'react'
type Props = {
  children: ReactNode
}

const UploadWrapper = ({ children }: Props) => {
  const uploadWrapperRef = useRef<HTMLDivElement | null>(null)
  const [numberCircleOfWidth, setNumberCircleOfWidth] = useState(0)
  const [numberCircleOfHeight, setNumberCircleOfHeight] = useState(0)
  const [isRemain, setIsRemain] = useState(false)
  const start = useAppSelector(
    (state) => state.uploadWrapperAnimateLoading.start
  )
  const [duration, setDuration] = useState({
    delayCircle: 0.015,
    animateCircle: 0.5,
  })
  const handleStartAnimateLoading = useStartAnimateLoading()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (isMobile) {
      setDuration({ delayCircle: 0.03, animateCircle: 0.6 })
    } else {
      setDuration({
        delayCircle: 0.015,
        animateCircle: 0.5,
      })
    }
  }, [isMobile])

  const handleResize = () => {
    if (uploadWrapperRef.current) {
      const uploadWrapperEl = uploadWrapperRef.current
      setIsRemain(
        (uploadWrapperEl.clientWidth % (24 - 4)) +
          (uploadWrapperEl.clientHeight % (24 - 4)) >
          24
      )

      setNumberCircleOfWidth(
        Math.floor(uploadWrapperEl.clientWidth / (24 + 4)) - 1
      )
      setNumberCircleOfHeight(
        Math.floor(uploadWrapperEl.clientHeight / (24 + 4)) - 1
      )
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const total = useMemo(
    () =>
      numberCircleOfHeight * 2 + numberCircleOfWidth * 2 + (isMobile ? 1 : 0),
    [isRemain, numberCircleOfHeight, numberCircleOfWidth]
  )
  const totalDelayInfinite = useMemo(
    () => duration.delayCircle * total,
    [total]
  )

  const ARR_COLOR = useMemo(
    () => [
      theme.palette.dotCoban[100],
      theme.palette.dotCoban[200],
      theme.palette.dotCoban[400],
      theme.palette.dotCoban[500],
      theme.palette.dotCoban[600],
      theme.palette.dotCoban[700],
      theme.palette.dotCoban[800],
    ],
    [theme]
  )
  const circleKeyframes = useMemo(() => {
    let objKeyframes = {}
    const percentForToggleColorCompleted =
      (duration.animateCircle / totalDelayInfinite) * 100
    ARR_COLOR.reverse().forEach((element, index) => {
      objKeyframes = {
        ...objKeyframes,
        [`${index * (percentForToggleColorCompleted / ARR_COLOR.length)}%`]: {
          backgroundColor: element,
        },
      }
    })
    objKeyframes = {
      ...objKeyframes,
      [`${
        ARR_COLOR.length * (percentForToggleColorCompleted / ARR_COLOR.length)
      }%`]: { backgroundColor: theme.palette.primary.dark },
      ['100%']: { backgroundColor: theme.palette.primary.dark },
    }

    return keyframes`${objKeyframes}`
  }, [total])

  const animateName = useMemo(() => {
    if (start) {
      return circleKeyframes
    } else {
      return ''
    }
  }, [circleKeyframes, start])
  return (
    <Stack
      ref={uploadWrapperRef}
      className='upload-wrapper'
      sx={{
        height: '100%',
        position: 'relative',
        border: '1px solid',
        borderColor: (theme) => theme.palette.border.light,
        borderRadius: APP_BORDER_RADIUS_PRIMARY,
        overflow: 'hidden',
      }}
    >
      {times(total).map((item, index) => {
        if (index < numberCircleOfWidth + 1) {
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: '50%',
                left: index !== 0 ? index * 24 + index * 4 + 8 : 8,
                animationName: `${animateName}`,
                animationDelay: `${duration.delayCircle * index}s`,
                animationDuration: `${totalDelayInfinite}s`,
                animationIterationCount: 'infinite',
              }}
            ></Box>
          )
        } else if (
          index >= numberCircleOfWidth + 1 &&
          index < numberCircleOfHeight + numberCircleOfWidth + 1
        ) {
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: '50%',
                right: 0,
                top:
                  index === numberCircleOfWidth + 1
                    ? (index - numberCircleOfWidth) * 24 +
                      (index - numberCircleOfWidth) * 4 +
                      2
                    : (index - numberCircleOfWidth) * 24 +
                      (index - numberCircleOfWidth) * 4 +
                      2,
                animationName: `${animateName}`,
                animationDelay: `${duration.delayCircle * index}s`,
                animationDuration: `${totalDelayInfinite}s`,
                animationIterationCount: 'infinite',
              }}
            ></Box>
          )
        } else if (
          index > numberCircleOfHeight + numberCircleOfWidth &&
          index <= numberCircleOfHeight + numberCircleOfWidth * 2
        ) {
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: '50%',
                bottom: 0,
                right:
                  (index - (numberCircleOfHeight + numberCircleOfWidth)) * 24 +
                  (index - (numberCircleOfHeight + numberCircleOfWidth)) * 4,
                animationName: `${animateName}`,
                animationDelay: `${duration.delayCircle * index}s`,
                animationDuration: `${totalDelayInfinite}s`,
                animationIterationCount: 'infinite',
              }}
            ></Box>
          )
        } else {
          return (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: '50%',
                left: 0,
                bottom:
                  (index - (numberCircleOfHeight + numberCircleOfWidth * 2)) *
                    24 +
                  (index - (numberCircleOfHeight + numberCircleOfWidth * 2)) *
                    4,
                animationName: `${animateName}`,
                animationDelay: `${duration.delayCircle * index}s`,
                animationDuration: `${totalDelayInfinite}s`,
                animationIterationCount: 'infinite',
              }}
            ></Box>
          )
        }
      })}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          bottom: 24,
          border: '1px solid',
          borderColor: (theme) => theme.palette.border.light,
          borderRadius: '8px',
        }}
      ></Box>
    </Stack>
  )
}

export default memo(UploadWrapper)

// , ${dotBlueCircleKeyframe} ${duration.animateCircle}s ${
//   totalDelayInfinite +
//   duration.delayCircle * index +
//   totalDelayInfinite
// }s infinite
