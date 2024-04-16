import { colorTheme } from '@/themes/_color'
import { Box, Stack, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

type Props = {
  wrapperId: string
  parentWidth: number
  value: number
}
const BoxCircleStyled = styled(Box)((theme) => ({
  [`@keyframes circle-progress`]: {
    '0%': {
      ['background-position']: 'right bottom',
      border: '1px solid',
      borderColor: 'var(--toggle-color)',
    },

    '100%': {
      ['background-position']: 'left bottom',
      border: '1px solid',
      borderColor: 'var(--toggle-color)',
    },
  },
}))
const BoxCirclePercentStyled = styled(Box)((theme) => ({
  [`@keyframes circle-progress-percent`]: {
    '0%': {
      ['background-position']: 'right bottom',
    },
    '100%': {
      ['background-position']: 'left bottom',
    },
  },
}))
const CIRCLE_SIZE = 14
const LIST_COLOR = ['#FBFE66', '#6461F3', '#77AAF8', '#4CF3D5', '#F57E7E']
const durationAnimation = 0.01
const LineProgress = ({ value, wrapperId }: Props) => {
  const [parentWidth, setParentWidth] = useState(0)
  const indexProgress = (value * parentWidth) / 100 / CIRCLE_SIZE
  const leftovers = indexProgress % Math.floor(indexProgress)
  const percentLeftOvers = leftovers * 100
  const containerRef = useRef<HTMLDivElement | null>(null)
  const handleResize = () => {
    if (containerRef.current) {
      setParentWidth(containerRef.current.clientWidth)
    }
  }
  useEffect(() => {
    let id: any = null
    if (containerRef.current) {
      setParentWidth(containerRef.current.clientWidth)
      let index = 0
      id = setInterval(() => {
        if (index === LIST_COLOR.length - 1) {
          index = 0
        }
        containerRef.current?.style.setProperty(
          '--toggle-color',
          LIST_COLOR[++index]
        )
      }, 300)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (id) {
        clearInterval(id)
      }
    }
  }, [])
  return (
    <Stack
      ref={containerRef}
      direction='row'
      alignItems={'center'}
      id={`line-wrapper-${wrapperId}`}
      sx={{
        ['--toggle-color']: '#FBFE66',
        minHeight: `${CIRCLE_SIZE}px`,
      }}
    >
      {Array(Math.floor(parentWidth / CIRCLE_SIZE))
        .fill(null)
        .map((_, i) => i)
        .map(
          (item, index) => (
            // index === Math.floor(indexProgress) && percentLeftOvers > 0 ? (
            // <BoxCirclePercentStyled
            //   key={index}
            //   sx={{
            //     width: `${CIRCLE_SIZE}px`,
            //     height: `${CIRCLE_SIZE}px`,
            //     borderRadius: '99px',
            //     background: `linear-gradient(to right, ${'var(--toggle-color)'} ${
            //       percentLeftOvers / 2
            //     }%, transparent ${percentLeftOvers / 2}%)`,
            //     backgroundSize: '200% 100%',
            //     backgroundPosition: 'right bottom',
            //     border: '1px solid',
            //     animation: `circle-progress-percent ${durationAnimation}s ${
            //       durationAnimation * index
            //     }s linear forwards`,
            //     borderColor: 'var(--toggle-color)',
            //   }}
            // ></BoxCirclePercentStyled>
            // ) : (
            <BoxCircleStyled
              key={index}
              sx={{
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
                borderRadius: '99px',
                background:
                  index < indexProgress
                    ? `linear-gradient(to right, ${'var(--toggle-color)'} 50%, transparent 50%)`
                    : 'transparent',
                backgroundSize: '200% 100%',
                backgroundPosition: 'right bottom',
                ...(index < indexProgress && {
                  border: '1px solid',
                  borderColor: 'var(--toggle-color)',
                  animation: `circle-progress ${durationAnimation}s ${
                    durationAnimation * index
                  }s linear forwards`,
                }),
                ...(index > indexProgress && {
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.baseGray[500],
                }),
              }}
            ></BoxCircleStyled>
          )
          // )
        )}
    </Stack>
  )
}

export default LineProgress
