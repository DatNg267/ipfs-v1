import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { DBGatewaysIcons } from '@/themes/_icons'
import { getCosX, getSinX, getTanFromDegrees } from '@/utils/math'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const SPEED_RANDOM_LOW_BANDWIDTH = 90
const SPEED_RANDOM_HIGH_BANDWIDTH = 50
const MAX_RAD_LOW_BANDWIDTH = 30
const MIN_RAD_LOW_BADNWIDTH = 25

const MAX_RAD_HIGH_BANDWIDTH = 180
const MIN_RAD_HIGH_BADNWIDTH = 180

function getRandomNumber(max: number, min: number) {
  var randomNumber = Math.random() * (max - min) + min
  return randomNumber.toFixed(2)
}
type Props = {
  speedMonitor: SpeedMonitor
  handleChangeSpeed: (isFast: boolean) => void
}
export type SpeedMonitor = 'fast' | 'low'
const SpeedMonitor = ({ handleChangeSpeed, speedMonitor }: Props) => {
  const isHighBandWidth = speedMonitor === 'fast'
  useEffect(() => {
    const speedText = document.querySelector(
      '#speed-monitor__text'
    ) as HTMLElement
    const needle = document.querySelector(
      '#speed-monitor__needle'
    ) as HTMLElement
    const speedRunCircleValue = document.querySelector(
      '#speed-monitor__circle-value'
    ) as HTMLElement
    if (speedText && speedRunCircleValue && needle) {
      let id = setInterval(
        () => {
          const randomValue = isHighBandWidth
            ? getRandomNumber(MAX_RAD_HIGH_BANDWIDTH, MIN_RAD_HIGH_BADNWIDTH)
            : getRandomNumber(MAX_RAD_LOW_BANDWIDTH, MIN_RAD_LOW_BADNWIDTH)
          speedText.innerHTML = isHighBandWidth
            ? (
                (parseFloat(randomValue) * 100) / 180 +
                Math.random() * (20 - 5) +
                5
              )
                .toFixed(2)
                .toString()
            : ((parseFloat(randomValue) * 100) / 180).toFixed(2).toString()
          speedRunCircleValue.style.transform = `rotate(${
            parseFloat(randomValue) - 45
          }deg)`

          needle.style.transform = `rotate(${
            parseFloat(randomValue) > 100
              ? parseFloat(randomValue) + 5
              : parseFloat(randomValue) - 2
          }deg)`
        },
        isHighBandWidth
          ? SPEED_RANDOM_HIGH_BANDWIDTH
          : SPEED_RANDOM_LOW_BANDWIDTH
      )

      return () => {
        clearInterval(id)
      }
    }
  }, [isHighBandWidth])
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        height: '100%',
      }}
      spacing={7}
    >
      <Typography variant='h5' fontWeight={'bold'} textAlign={'center'}>
        BANDWIDTH
      </Typography>
      <Stack alignItems={'center'}>
        <Box
          sx={{
            width: '280px',
            height: '140px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              zIndex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '-100%',
              border: '30px solid #ccccbd',
              borderRadius: '50%',
            }}
          ></Box>
          <Box
            id='speed-monitor__circle-value'
            sx={{
              zIndex: 2,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: '-100%',
              overflow: 'hidden',
              border: '30px solid',
              borderColor: 'transparent transparent #808076 #808076',
              borderRadius: '50%',
              transform: 'rotate(0deg)',
              transition: 'all ease-in 0.15s',
            }}
          ></Box>

          <Stack
            sx={{
              zIndex: 200,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              transition: 'all ease-in 0.15s',
            }}
            alignItems={'center'}
            id='speed-monitor__needle'
          >
            <SvgIconCustomized
              viewBox='0 0 85 16'
              component={DBGatewaysIcons.Needle}
              sx={{
                fontSize: '85px',
                height: 'fit-content',
                transform: 'translateX(calc(-50% + 8px)) rotate(0deg)',
              }}
            ></SvgIconCustomized>
          </Stack>

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 300,
            }}
          >
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180].map((item) => {
              if (item <= 90) {
                return (
                  <Typography
                    key={item}
                    variant='body2'
                    fontWeight={600}
                    sx={{
                      position: 'absolute',
                      bottom: `${
                        Math.sin((item * Math.PI) / 180) * (140 - 60)
                      }px`,
                      left: `${
                        140 - 30 - Math.cos((item * Math.PI) / 180) * (140 - 60)
                      }px`,
                      transform:
                        item === 90
                          ? 'translate(110%,-13%)'
                          : `translate(calc(100% - 2px), 0%)`,
                    }}
                  >
                    {Math.floor((item * 100) / 180)}
                  </Typography>
                )
              } else {
                return (
                  <Typography
                    key={item}
                    variant='body2'
                    fontWeight={600}
                    sx={{
                      position: 'absolute',
                      bottom: `${
                        Math.sin((item * Math.PI) / 180) * (140 - 60)
                      }px`,
                      left: `${
                        140 - Math.cos((item * Math.PI) / 180) * (140 - 60)
                      }px`,
                      // transform: 'translate(-100%, 0%)',
                    }}
                  >
                    {Math.floor((item * 100) / 180)}
                  </Typography>
                )
              }
            })}
          </Box>
        </Box>
      </Stack>

      <Stack alignItems={'center'}>
        <Typography component={'span'}>
          <Typography
            id='speed-monitor__text'
            component={'span'}
            variant='subtitle2'
            fontWeight={'bold'}
          >
            100
          </Typography>
          <Typography
            component={'span'}
            variant='subtitle2'
            fontWeight={'bold'}
          >
            &nbsp;MB/s
          </Typography>
        </Typography>
        <Typography variant='body1' fontWeight={'medium'}>
          AIOZ Gateway #5
        </Typography>
      </Stack>
      {/* 
      <Button
        onMouseMove={(e) => {
          handleChangeSpeed(true)
        }}
        onMouseLeave={() => {
          handleChangeSpeed(false)
        }}
      >
        Hover me
      </Button> */}
    </Stack>
  )
}

export default SpeedMonitor
