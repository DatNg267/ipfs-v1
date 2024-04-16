import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { times } from 'lodash'
import { useEffect, useState } from 'react'
import { STORE_MAX_HEIGH, STORE_MAX_HEIGH_MB } from '.'
import Col from './col'
import { CircleColor } from './types'

const WIDTH = 768
const numberCol = WIDTH / 24

const DOTS: {
  [key: string]: {
    isReverse: boolean
    color: CircleColor
    delay: number
  }
} = {
  '4': {
    isReverse: false,
    color: 'pink',
    delay: 1000,
  },
  '8': {
    isReverse: true,
    color: 'yellow',
    delay: 500,
  },
  '10': {
    isReverse: false,
    color: 'blue',
    delay: 4000,
  },
  '16': {
    isReverse: false,
    color: 'mint',
    delay: 3000,
  },
  '20': {
    isReverse: true,
    color: 'yellow',
    delay: 5000,
  },
  '30': {
    isReverse: true,
    color: 'blue',
    delay: 2000,
  },
}
const MultiCol = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [height, setHeight] = useState(
    isMobile ? STORE_MAX_HEIGH_MB : STORE_MAX_HEIGH
  )

  useEffect(() => {
    const wrapHeight = document
      .querySelector('#multi-col-wrapper')
      ?.getBoundingClientRect().height
    if (wrapHeight) {
      setHeight(wrapHeight)
    }
  }, [])
  return (
    <Stack
      id='multi-col-wrapper'
      direction={'row'}
      sx={{
        height: '100%',
      }}
    >
      {times(numberCol).map((item, index) => (
        <Col
          id={index}
          color={DOTS[index + 1]?.color}
          key={index}
          height={height}
          delayStart={DOTS[index + 1]?.delay}
          isActive={!!DOTS[index + 1]}
          isReverse={DOTS[index + 1]?.isReverse}
        ></Col>
      ))}
    </Stack>
  )
}

export default MultiCol
