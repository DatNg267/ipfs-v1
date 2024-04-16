import { getRandomNumber } from '@/utils'
import { css, keyframes } from '@emotion/css'
import { Box, useTheme } from '@mui/material'
import { debounce } from 'lodash'

type Props = {}
const LayerAnimate = (props: Props) => {
  const theme = useTheme()
  const ARR_COLOR = [
    theme.palette.dotBlue,
    theme.palette.dotCoban,
    theme.palette.dotGreen,
    theme.palette.dotMint,
    theme.palette.dotOrange,
    theme.palette.dotPink,
    theme.palette.dotPurple,
    theme.palette.dotYellow,
  ]

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // const circle = document.getElementById('circle')
    const parent = document.getElementById('parent-layer')
    const isShow = Math.round(getRandomNumber(0, 6)) === 1
    if (!isShow) return
    if (!parent) return
    // if (!circle || !parent) return

    const parentRect = parent.getBoundingClientRect()
    const x = e.clientX - parentRect.left
    const y = e.clientY - parentRect.top
    // circle.style.left = x - circle.clientWidth / 2 + 'px'
    // circle.style.top = y - circle.clientHeight / 2 + 'px'
    const indexColor = Math.round(getRandomNumber(0, ARR_COLOR.length - 1))
    const color = ARR_COLOR[indexColor]
    const animate = keyframes`
      0% {
        background-color: ${color[500]};
        opacity: 1;
      }
      100% {
        background-color: ${color[100]};
        opacity: 0;
      }
    `
    const newDiv = document.createElement('div')
    const styles = css`
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      left: ${x - 24 / 2}px;
      top: ${y - 24 / 2}px;
      animation: ${animate} ease-in-out 3s;
    `
    newDiv.className = `${styles}`
    parent.appendChild(newDiv)

    setTimeout(() => {
      newDiv.remove()
    }, 3000)
  }
  return (
    <Box
      id='parent-layer'
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
      onMouseMove={handleMove}
    >
      {/* <Box
        id='circle'
        sx={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          border: '1px solid #fff',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      ></Box> */}
      {/* {times(200).map((row, rowIndex) => (
        <Stack direction='row' key={rowIndex}>
          {times(100).map((col, colIndex) => (
            <Box
              key={colIndex}
              sx={{
                width: '24px',
                height: '24px',
                border: '1px solid #fff',
                borderRadius: '50%',
                display: 'inline-block',
                zIndex: 1,
              }}
            ></Box>
          ))}
        </Stack>
      ))} */}
    </Box>
  )
}

export default LayerAnimate
