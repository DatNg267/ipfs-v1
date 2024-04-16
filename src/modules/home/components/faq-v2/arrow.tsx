import { colorTheme } from '@/themes/_color'
import { Box, Stack, keyframes } from '@mui/material'
import { times } from 'lodash'

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
const generateBackground = (rowIndex: number, colIndex: number) => {
  if (colIndex + 1 > FIRST_ARROW_COL_NUMBER) {
    const absoluteIndex = Math.floor((colIndex + 1 - 3) / ARROW_COL_NUMBER)
    const ARROW_INDEX =
      (colIndex + 1 - 3) % ARROW_COL_NUMBER === 0
        ? absoluteIndex - 1
        : absoluteIndex
    const mainColor =
      ARROW_INDEX + 1 === ARROW_COL_NUMBER
        ? `var(--arrow-color-${100})`
        : `var(--arrow-color-${100 * (ARROW_INDEX + 2)})`
    const prevColor =
      (colIndex + 1 - 3) % ARROW_COL_NUMBER === 0
        ? `var(--arrow-color-${100 * (ARROW_INDEX + 2)})`
        : `var(--arrow-color-${100 * (ARROW_INDEX + 1)})`

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
      backgroundColor: `var(--arrow-color-${100})`,
    }
  }
}

const FaqArrow = () => {
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
          ['--arrow-color-100']: colorTheme.general.dotMint[500],
          ['--arrow-color-200']: colorTheme.general.dotMint[600],
          ['--arrow-color-300']: colorTheme.general.dotMint[700],
          ['--arrow-color-400']: colorTheme.general.dotMint[800],
          ['--arrow-color-500']: colorTheme.general.dotMint[900],
          ['--arrow-color-600']: colorTheme.general.dotMint[950],
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
                    ...generateBackground(rowIndex, colIndex),
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
                    ...generateBackground(rowIndex, colIndex),
                  }}
                />
              ))}
            </Stack>
          ))}
        </Box>
      </Stack>
    </Stack>
  )
}

export default FaqArrow
