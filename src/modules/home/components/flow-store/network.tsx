import { ImagesHomePage } from '@/themes/_images'
import {
  Box,
  Stack,
  Typography,
  keyframes,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { forEach, times } from 'lodash'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {}
const DOT_PINK_CIRCLE_ANIMATION = {
  '100%': {
    backgroundColor: '#ccccbd',
  },
  '75%': {
    backgroundColor: '#a6a69a',
  },

  '50%': {
    backgroundColor: '#808076',
  },
  '25%': {
    backgroundColor: '#595952',
  },
  '0%': {
    backgroundColor: '#ccccbd',
  },
}

const dotPinkCircleKeyframe = keyframes`
  ${DOT_PINK_CIRCLE_ANIMATION}
`
const ICON_LOCATIONS = {
  purple: {
    image: ImagesHomePage.NetworkAiozPurple,
    locations: [
      [2, 12],
      [2, 13],
      [2, 14],
      [3, 12],
      [3, 13],
      [3, 14],
      [4, 12],
      [4, 13],
      [4, 14],
    ],
  },
  red: {
    image: ImagesHomePage.NetworkAiozRed,
    locations: [
      [14, 5],
      [14, 6],
      [14, 7],
      [15, 5],
      [15, 6],
      [15, 7],
      [16, 5],
      [16, 6],
      [16, 7],
    ],
  },
  pink: {
    image: ImagesHomePage.NetworkAiozPink,
    locations: [
      [16, 15],
      [16, 16],
      [16, 17],
      [17, 15],
      [17, 16],
      [17, 17],
      [18, 15],
      [18, 16],
      [18, 17],
    ],
  },
  mint: {
    image: ImagesHomePage.NetworkAiozMint,
    locations: [
      [9, 19],
      [9, 20],
      [9, 21],
      [10, 19],
      [10, 20],
      [10, 21],
      [11, 19],
      [11, 20],
      [11, 21],
    ],
  },
  blue: {
    image: ImagesHomePage.NetworkAiozBlue,
    locations: [
      [6, 2],
      [6, 3],
      [6, 4],
      [7, 2],
      [7, 3],
      [7, 4],
      [8, 2],
      [8, 3],
      [8, 4],
    ],
  },
}
const ICONS_LOCATION_KEYS = Object.keys(ICON_LOCATIONS)
const TIMING_LIST = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]
const ANIMATE_LIST = [
  // blue -> purple
  [
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 7],
    [6, 7],
    [5, 7],
    [5, 8],
    [5, 9],
    [4, 9],
    [3, 9],
    [3, 10],
    [3, 11],
  ],
  // blue -> red
  [
    [9, 3],
    [10, 3],
    [11, 3],
    [12, 3],
    [12, 4],
    [12, 5],
    [12, 6],
    [13, 6],
  ],
  // red -> purple
  [
    [13, 6],
    [12, 6],
    [11, 6],
    [10, 6],
    [10, 7],
    [10, 8],
    [10, 9],
    [10, 10],
    [10, 11],
    [10, 12],
    [10, 13],
    [9, 13],
    [8, 13],
    [7, 13],
    [6, 13],
    [5, 13],
  ],
  // pink -> red
  [
    [17, 14],
    [17, 13],
    [17, 12],
    [17, 11],
    [17, 10],
    [17, 9],
    [16, 9],
    [15, 9],
    [15, 8],
  ],
  // pink -> mint
  [
    [15, 16],
    [14, 16],
    [13, 16],
    [12, 16],
    [12, 17],
    [11, 17],
    [10, 17],
    [10, 18],
  ],
  // mint -> pink
  [
    [12, 20],
    [13, 20],
    [14, 20],
    [15, 20],
    [15, 19],
    [16, 19],
    [17, 19],
    [17, 18],
  ],
  // mint -> purle
  [
    [8, 20],
    [7, 20],
    [6, 20],
    [6, 21],
    [5, 21],
    [4, 21],
    [4, 20],
    [4, 19],
    [4, 18],
    [4, 17],
    [4, 16],
    [3, 16],
    [3, 15],
  ],
]

const NetWork = (props: Props) => {
  const [circleSize, setCircleSize] = useState(24)
  const colCount = 23
  const rowCount = 20

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    if (isMobile) {
      setCircleSize(14)
    } else {
      setCircleSize(24)
    }
  }, [isMobile])
  return (
    <Stack
      alignItems={'center'}
      spacing={{ xs: 4, md: 4 }}
      flexDirection={{ xs: 'column-reverse', md: 'column' }}
    >
      <Stack sx={{ position: 'relative' }}>
        {ICONS_LOCATION_KEYS.map((key, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: ICON_LOCATIONS[key].locations[0][0] * circleSize,
              left: ICON_LOCATIONS[key].locations[0][1] * circleSize,
            }}
          >
            <Image
              alt='Network-AIOZ'
              src={ICON_LOCATIONS[key].image}
              width={isMobile ? 42 : 72}
              height={isMobile ? 42 : 72}
              loading='lazy'
            ></Image>
          </Box>
        ))}

        {times(rowCount).map((row, rowIndex) => (
          <Stack direction={'row'} key={rowIndex}>
            {times(colCount).map((col, colIndex) => {
              const animateListIndex = ANIMATE_LIST.findIndex(
                (animteListItem) =>
                  animteListItem.findIndex(
                    (animateItem) =>
                      animateItem[0] === rowIndex && animateItem[1] === colIndex
                  ) >= 0
              )
              let animateIndex = -1
              let newAnimate = null
              if (animateListIndex >= 0) {
                animateIndex = ANIMATE_LIST[animateListIndex].findIndex(
                  (animate) =>
                    animate[0] === rowIndex && animate[1] === colIndex
                )
                const arrColor = ['#595952', '#808076', '#a6a69a']
                let newKeyframes = {
                  '100%': {
                    backgroundColor: '#ccccbd',
                  },
                  '0%': {
                    backgroundColor: '#ccccbd',
                  },
                }
                for (
                  let _animateIndex = 0;
                  _animateIndex < ANIMATE_LIST[animateListIndex].length;
                  _animateIndex++
                ) {
                  newKeyframes = {
                    ...newKeyframes,
                    [`${
                      Math.round(100 / ANIMATE_LIST[animateListIndex].length) *
                      _animateIndex
                    }%`]: {
                      backgroundColor:
                        _animateIndex <= 2
                          ? arrColor[_animateIndex]
                          : '#ccccbd',
                    },
                  }
                }
                newAnimate = keyframes`${newKeyframes}`
              }
              const iconLocationKeys = Object.keys(ICON_LOCATIONS)
              let isIconLocation = false
              for (let index = 0; index < iconLocationKeys.length; index++) {
                const iconLocationKey = iconLocationKeys[index]
                const isExists = ICON_LOCATIONS[iconLocationKey].locations.find(
                  (itemLocation, indexItemLocation) =>
                    rowIndex === itemLocation[0] && colIndex === itemLocation[1]
                )
                if (isExists) {
                  isIconLocation = true
                  break
                }
              }
              if (animateIndex >= 0) {
                return (
                  <Box
                    sx={{
                      border: 'none',
                      borderRadius: '99px',
                      borderColor: '#ccccbd',
                      backgroundColor: '#ccccbd',
                      width: `${circleSize}px`,
                      height: `${circleSize}px`,
                      animation: `${newAnimate} ${
                        TIMING_LIST[animateListIndex] *
                        ANIMATE_LIST[animateListIndex].length
                      }s ${
                        1 + TIMING_LIST[animateListIndex] * animateIndex
                      }s infinite`,
                    }}
                    key={colIndex}
                  />
                )
              } else
                return (
                  <Box
                    sx={{
                      border: '1px solid',
                      borderRadius: '99px',
                      borderColor: '#ccccbd',
                      width: `${circleSize}px`,
                      height: `${circleSize}px`,
                      backgroundColor: 'transparent',
                    }}
                    key={colIndex}
                  />
                )
            })}
          </Stack>
        ))}
      </Stack>
      {/* <Image
        alt='AIOZ-network'
        width={isMobile ? 335 : 552}
        height={isMobile ? 292 : 480}
        src={ImagesHomePage.Network}
        style={{
          maxWidth: '552px',
          height: 'auto',
          ...(isMobile && {
            width: '100%',
            height: 'auto',
          }),
        }}
        priority={true}
      ></Image> */}
      <Typography variant='h4' fontWeight={'bold'} pb={{ xs: 2, md: 0 }}>
        AIOZ NETWORK
      </Typography>
    </Stack>
  )
}

export default NetWork
