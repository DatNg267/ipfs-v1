import { Box, Stack, useTheme } from '@mui/material'
import { times } from 'lodash'
import React, { useEffect, useRef } from 'react'

type Props = {}
const SPACE = 4
const TOTAL_LINE = 10
const TOTAL_COLOR = 5
const EstimateMonthlyUsageLayer = (props: Props) => {
  const theme = useTheme()
  const layerRef = useRef<HTMLDivElement | null>(null)
  // useEffect(() => {
  //   let id: any = null
  //   let indexColor = 1
  //   if (layerRef.current) {
  //     id = setInterval(() => {
  //       const layer = layerRef.current as HTMLDivElement
  //       for (let i = 1; i <= TOTAL_COLOR; i++) {
  //         layer.style.setProperty(
  //           `--circle-color-${100 * i}`,
  //           theme.palette.dotPink[
  //             (indexColor + i) * 100 > TOTAL_COLOR * 100
  //               ? ((indexColor + i) * 100) % (TOTAL_COLOR * 100)
  //               : (indexColor + i) * 100
  //           ]
  //         )
  //       }
  //       if (indexColor + 1 > TOTAL_COLOR) {
  //         indexColor = 1
  //       } else {
  //         indexColor++
  //       }
  //     }, 1000)
  //   }
  //   return () => {
  //     if (id) clearInterval(id)
  //   }
  // }, [])
  return (
    <Box
      sx={{
        position: 'absolute',
        top: { xs: 120, md: 120 },
        left: { xs: 60, md: 240 },
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        ref={layerRef}
        sx={{
          position: 'absolute',
          width: 'fit-content',
          height: 'fit-content',
          ['--circle-color-100']: (theme) => theme.palette.dotPink[700],
          ['--circle-color-200']: (theme) => theme.palette.dotPink[800],
          ['--circle-color-300']: (theme) => theme.palette.dotPink[900],
          ['--circle-color-400']: (theme) => theme.palette.dotPink[950],
          ['--circle-color-500']: (theme) => theme.palette.dotPink[100],
        }}
      >
        {times(TOTAL_LINE).map((line, lineIndex) => {
          return (
            <Box key={lineIndex}>
              {times(SPACE).map((space, spaceIndex) => {
                return (
                  <Stack
                    direction={'row'}
                    sx={{}}
                    key={`${lineIndex} ${spaceIndex}`}
                  >
                    {times(TOTAL_LINE * SPACE).map((col, colIndex) => {
                      return (
                        <Box
                          key={`${colIndex} ${space}`}
                          sx={{
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                            backgroundColor:
                              colIndex < SPACE * line
                                ? `var(--circle-color-${
                                    (Math.floor(colIndex / SPACE) + 1) * 100 >
                                    TOTAL_COLOR * 100
                                      ? Math.round(
                                          ((Math.floor(colIndex / SPACE) + 1) *
                                            100) %
                                            (TOTAL_COLOR * 100)
                                        )
                                      : (Math.floor(colIndex / SPACE) + 1) * 100
                                  })`
                                : `var(--circle-color-${
                                    (line + 1) * 100 > TOTAL_COLOR * 100
                                      ? Math.round(
                                          ((line + 1) * 100) %
                                            (TOTAL_COLOR * 100)
                                        )
                                      : (line + 1) * 100
                                  })`,
                            borderRadius: '50%',
                          }}
                        ></Box>
                      )
                    })}
                  </Stack>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default EstimateMonthlyUsageLayer
