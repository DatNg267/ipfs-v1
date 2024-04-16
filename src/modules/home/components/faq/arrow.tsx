import { colorTheme } from '@/themes/_color'
import { Box, Stack, keyframes } from '@mui/material'
import { times } from 'lodash'

const DOT_YELLOW_CIRCLE_ANIMATION = {
  '100%': {
    backgroundColor: colorTheme.general.dotYellow[100],
  },
  '75%': {
    backgroundColor: colorTheme.general.dotYellow[200],
  },

  '50%': {
    backgroundColor: colorTheme.general.dotYellow[400],
  },
  '25%': {
    backgroundColor: colorTheme.general.dotYellow[600],
  },
  '0%': {
    backgroundColor: colorTheme.general.dotYellow[800],
  },
}
const animation = keyframes`
${DOT_YELLOW_CIRCLE_ANIMATION}
`

const ROW_COUNT = 7
const COLUMNS = 36
const FIRST_ARROW_COL_NUMBER = 3
const ARROW_COL_NUMBER = 6
const PERCENT_PER_MOVE = 36 / 7

const generateKey = () => {
  let obj = {
    '0%': {
      transform: `translateX(-${24 * COLUMNS}px)`,
    },
    '100%': {
      transform: `translateX(0px)`,
    },
  }
  for (let index = 1; index < COLUMNS; index++) {
    obj = {
      ...obj,
      [`${Math.round(PERCENT_PER_MOVE * index)}`]: {
        transform: `translateX(-${24 * index}px)`,
      },
    }
  }

  return obj
}
const OBJ_MOVE_PER = generateKey()
const ANIMATION_MOVE_PER = keyframes`
${OBJ_MOVE_PER}
`
const generateBackground = (
  rowIndex: number,
  colIndex: number,
  arrColor: any
) => {
  if (colIndex + 1 > FIRST_ARROW_COL_NUMBER) {
    const absoluteIndex = Math.floor((colIndex + 1 - 3) / ARROW_COL_NUMBER)
    const ARROW_INDEX =
      (colIndex + 1 - 3) % ARROW_COL_NUMBER === 0
        ? absoluteIndex - 1
        : absoluteIndex
    const mainColor =
      ARROW_INDEX + 1 === ARROW_COL_NUMBER
        ? arrColor['100']
        : arrColor[(100 * (ARROW_INDEX + 2)).toString()]
    const prevColor =
      (colIndex + 1 - 3) % ARROW_COL_NUMBER === 0
        ? arrColor[(100 * (ARROW_INDEX + 2)).toString()]
        : arrColor[(100 * (ARROW_INDEX + 1)).toString()]

    const currentFirstColInArrow = 3 + absoluteIndex * ARROW_COL_NUMBER
    const currentLastColInArrow =
      ARROW_COL_NUMBER + (3 + absoluteIndex * ARROW_COL_NUMBER) - 2

    const currentColInArrow = colIndex + 1 - currentFirstColInArrow

    const isPrev =
      rowIndex >= 0 + currentColInArrow &&
      rowIndex <= ROW_COUNT - currentColInArrow - 1 &&
      colIndex + 1 >= currentFirstColInArrow &&
      colIndex + 1 <= currentLastColInArrow

    return {
      backgroundColor: isPrev ? prevColor : mainColor,
    }
  } else {
    return {
      backgroundColor: arrColor[`100`],
    }
  }
}
const MoveXSmall = {
  '100%': {
    transform: 'translateX(0px)',
  },
  '0%': {
    transform: `translateX(-24px)`,
  },
}
const MoveX = {
  '100%': {
    transform: 'translateX(0px)',
  },

  '0%': {
    transform: `translateX(-${24 * COLUMNS}px)`,
  },
}
const translate = keyframes`
${MoveXSmall}
`
type Props = {
  arrColor: any
}

const FaqArrow = ({ arrColor }: Props) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        width: `${24 * COLUMNS}px`,
        maxWidth: `${24 * COLUMNS}px`,
        overflow: 'hidden',
        marginLeft: { xs: '-16px', md: '-16px' },
      }}
    >
      <Stack
        id='arrow-wrap'
        direction={'row'}
        sx={{
          animation: `${ANIMATION_MOVE_PER} ${
            COLUMNS * 0.12
          }s linear infinite `,
          // transition: 'transform linear',
        }}
      >
        <Box>
          {times(ROW_COUNT).map((row, rowIndex) => (
            <Stack direction={'row'} key={rowIndex}>
              {times(COLUMNS).map((col, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '99px',
                    ...generateBackground(rowIndex, colIndex, arrColor),
                  }}
                />
              ))}
            </Stack>
          ))}
        </Box>
        <Box>
          {times(ROW_COUNT).map((row, rowIndex) => (
            <Stack direction={'row'} key={rowIndex}>
              {times(COLUMNS).map((col, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '99px',
                    ...generateBackground(rowIndex, colIndex, arrColor),
                  }}
                />
              ))}
            </Stack>
          ))}
        </Box>
        {/* <Box>
          {times(ROW_COUNT).map((row, rowIndex) => (
            <Stack direction={'row'} key={rowIndex}>
              {times(COLUMNS).map((col, colIndex) => (
                <Box
                  key={colIndex}
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '99px',
                    ...generateBackground(rowIndex, colIndex),
                  }}
                />
              ))}
            </Stack>
          ))}
        </Box> */}
      </Stack>
    </Stack>
  )
}

export default FaqArrow
