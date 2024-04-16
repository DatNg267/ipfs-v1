import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
type Props = {
  id: string
  max: number
  value: number
  handleChange: (id: string, value: number) => void
  sx?: any
  [key: string]: any
}
export const useProgressBar = ({
  defaultValues,
}: {
  defaultValues: {
    [key: string]: number
  }
}) => {
  const [values, setValues] = useState({
    ...defaultValues,
  })
  const handleChange = useCallback(
    (_id: string, _value: number) => {
      setValues({
        ...values,
        [`${_id}`]: _value,
      })
    },
    [values]
  )

  return { values, handleChange }
}
const ProgressBarCustomized = ({
  value,
  id,
  max,
  handleChange,
  sx,
  ...props
}: Props) => {
  const [moved, setMoved] = useState(false)

  let moveListener = (e: MouseEvent) => {
    if (moved) {
      const progress_bar = document.querySelector(`#progress-bar-${id}`)
      if (!progress_bar) return
      const progress_bar_left = progress_bar.getBoundingClientRect().left
      const progress_bar_right = progress_bar.getBoundingClientRect().right
      if (e.clientX >= progress_bar_left && e.clientX <= progress_bar_right) {
        const percent =
          (e.clientX - progress_bar_left + 1) /
          (progress_bar_right - progress_bar_left + 1)
        handleChange(id, percent * 100.0)
      } else if (e.clientX < progress_bar_left) {
        handleChange(id, 0)
      } else if (e.clientX > progress_bar_right) {
        handleChange(id, 100)
      } else {
        return
      }
    } else {
    }
  }
  let downListener = () => {
    setMoved(true)
  }
  let upListener = () => {
    setMoved(false)
  }
  useEffect(() => {
    const progress_btn = document.querySelector(`#progress-bar__circle-${id}`)
    if (progress_btn) {
      progress_btn.addEventListener('mousedown', downListener)

      document.addEventListener('mousemove', moveListener)
      document.addEventListener('mouseup', upListener)
      return () => {
        progress_btn.removeEventListener('mousedown', downListener)
        document.removeEventListener('mousemove', moveListener)
        document.removeEventListener('mouseup', upListener)
      }
    }
  }, [moved, id])
  return (
    <Box
      id={`progress-bar-${id}`}
      sx={{
        position: 'relative',
        width: '100%',
        height: '8px',
        border: '1px solid black',
        margin: '60px 0',
        borderRadius: APP_BORDER_RADIUS_PRIMARY,
        ...sx,
      }}
    >
      <Box
        id={`progress-completed-bar-${id}`}
        sx={{
          width: `${value}%`,
          height: '100%',
          background: 'black',
        }}
      ></Box>
      <Stack
        sx={{
          height: '72px',
          position: 'absolute',

          left: `${value}%`,
          bottom: '50%',
          transform: 'translate(-50%, 50%)',
        }}
        draggable='true'
        id={`progress-bar__circle-${id}`}
      >
        <Box flex={1}>
          <Typography
            variant='body1'
            color='primary'
            fontWeight={400}
            noWrap
            sx={{
              pointerEvents: 'none',
              cursor: 'pointer',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {Math.round((value * max) / 100)} TB
          </Typography>
          <SvgIconCustomized
            component={Icons.Ellipse}
            sx={{
              fontSize: '72px',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default ProgressBarCustomized
