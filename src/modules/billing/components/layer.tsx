import { breakpoints } from '@/themes/_theme'
import { getRandomNumber } from '@/utils'
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import { debounce, times } from 'lodash'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

type Props = {}
const NUMBER_OF_LINE = 28
const BalanceLayer = (props: Props) => {
  const [numberOfLine, setNumberOfLine] = useState(NUMBER_OF_LINE)
  const theme = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const ARR_GROUP_COLOR = useMemo(
    () => [
      theme.palette.dotBlue,
      theme.palette.dotCoban,
      theme.palette.dotGreen,
      theme.palette.dotMint,
      theme.palette.dotOrange,
      theme.palette.dotPink,
      theme.palette.dotPurple,
      theme.palette.dotYellow,
    ],
    [theme]
  )
  const OBJ_COLORS = useMemo(() => {
    return {
      '50': theme.palette.dotYellow[50],
      '100': theme.palette.dotYellow[100],
      '200': theme.palette.dotYellow[200],
      '300': theme.palette.dotYellow[300],
      '400': theme.palette.dotYellow[400],
      '500': theme.palette.dotYellow[500],
      '600': theme.palette.dotYellow[600],
      '700': theme.palette.dotYellow[700],
      '800': theme.palette.dotYellow[800],
      '900': theme.palette.dotYellow[900],
      '950': theme.palette.dotYellow[950],
    }
  }, [theme])
  const layerRef = useRef<HTMLDivElement | null>(null)

  const handleResizeWindow = debounce(() => {
    if (layerRef.current) {
      const layerEl = layerRef.current
      const firstEl = layerEl.querySelector('div')
      const width = firstEl ? firstEl.clientWidth : 24
      setNumberOfLine(Math.round(layerEl.clientWidth / width))
    }
  }, 200)
  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow)

    let idInterval: any = null
    if (layerRef.current) {
      const layerEl = layerRef.current
      idInterval = setInterval(() => {
        const keys = Object.keys(OBJ_COLORS)
        const groupColor: any =
          ARR_GROUP_COLOR[
            Math.round(getRandomNumber(0, ARR_GROUP_COLOR.length - 1))
          ]
        keys.forEach((key: any) => {
          layerEl.style.setProperty(`--layer-color-${key}`, groupColor[key])
        })
      }, 600)
    }
    return () => {
      if (idInterval) clearInterval(idInterval)
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Stack
        ref={layerRef}
        direction={'row'}
        justifyContent={'flex-end'}
        sx={{
          position: 'absolute',
          top: 0,
          left: { xs: 0, md: 150 },
          right: 0,
          bottom: 0,
          [`--layer-color-50`]: OBJ_COLORS[50],
          [`--layer-color-100`]: OBJ_COLORS[100],
          [`--layer-color-200`]: OBJ_COLORS[200],
          [`--layer-color-300`]: OBJ_COLORS[300],
          [`--layer-color-400`]: OBJ_COLORS[400],
          [`--layer-color-500`]: OBJ_COLORS[500],
          [`--layer-color-600`]: OBJ_COLORS[600],
          [`--layer-color-700`]: OBJ_COLORS[700],
          [`--layer-color-800`]: OBJ_COLORS[800],
          [`--layer-color-900`]: OBJ_COLORS[900],
          [`--layer-color-950`]: OBJ_COLORS[950],
        }}
      >
        {times(numberOfLine).map((line, lineIndex) => (
          <Line key={lineIndex} objColors={OBJ_COLORS} layerRef={layerRef} />
        ))}
      </Stack>
    </Box>
  )
}

const NUMBER_OF_CIRCLE = 20
export const Line = ({
  objColors,
  layerRef,
}: {
  objColors: any
  layerRef: React.RefObject<HTMLDivElement | null>
}) => {
  const keys = useMemo(() => Object.keys(objColors), [objColors])
  const randomEndLine = useMemo(
    () => Math.round(getRandomNumber(2, keys.length - 1)),
    []
  )
  const randomStart = useMemo(
    () => Math.round(getRandomNumber(1, keys.length - 1)),
    []
  )
  const lineRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (layerRef.current && lineRef.current) {
      const layerEl = layerRef.current
      const lineEl = lineRef.current
      const mutation = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.attributeName !== 'style' &&
            mutation.type !== 'attributes'
          )
            return
          const reRandomLengthLine = Math.round(
            getRandomNumber(2, keys.length - 1)
          )
          const reRandomStart = Math.round(getRandomNumber(1, keys.length - 1))
          const divs = lineEl.querySelectorAll('div')
          for (let index = 0; index < NUMBER_OF_CIRCLE; index++) {
            const divEl = divs[index]
            divEl.style.backgroundColor =
              index > reRandomLengthLine - 1
                ? 'transparent'
                : `var(--layer-color-${keys[reRandomStart + index]})`
          }
        }
      })
      mutation.observe(layerEl, {
        attributes: true,
      })
    }
  }, [])
  return (
    <Stack
      overflow={'hidden'}
      direction={'column-reverse'}
      justifyContent={'flex-start'}
      sx={{ minWidth: { xs: '20px', md: '24px' } }}
      ref={lineRef}
    >
      {times(NUMBER_OF_CIRCLE).map((circle, circleIndex) => (
        <Box
          key={circleIndex}
          sx={{
            minHeight: { xs: '20px', md: '24px' },
            width: { xs: '20px', md: '24px' },
            overflow: 'hidden',
            borderRadius: '50%',
            backgroundColor:
              circleIndex > randomEndLine - 1
                ? 'transparent'
                : `var(--layer-color-${keys[randomStart + circleIndex]})`,
          }}
        ></Box>
      ))}
    </Stack>
  )
}
export default memo(BalanceLayer)
