import { Icons } from '@/themes/_icons'
import { css } from '@emotion/css'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { SvgIconCustomized } from '../svg-icon'

type Props = {
  parentId: string
  cssProperty: string
}

const ProgressBarV2 = ({ parentId, cssProperty }: Props) => {
  const isMouseDown = useRef(false)

  useEffect(() => {
    const progressContainer = document.querySelector(
      `#${parentId}`
    ) as HTMLElement
    const progress = document.querySelector(
      `#${parentId} progress`
    ) as HTMLElement
    const circle = document.querySelector(
      `#${parentId} .progress-bar__circle-container`
    ) as HTMLElement

    const circleContainer = document.querySelector(
      `#${parentId} .progress-bar__circle-container`
    ) as HTMLElement

    if (!circle || !progressContainer || !circleContainer || !progress) return

    progress.addEventListener('click', handleClickProgressBar)
    circle.addEventListener('mousedown', (e) => {
      isMouseDown.current = true
    })

    document.addEventListener('mouseup', (e) => {
      isMouseDown.current = false
    })
    // circle.addEventListener('drag', (e) => {
    //   isMouseDown.current = true
    //   handleDrag(e)
    // })
    document.addEventListener('mousemove', handleDrag)

    // unmounted
    return () => {
      circle.removeEventListener('mousedown', () => {
        isMouseDown.current = false
      })
      document.removeEventListener('mouseup', () => {
        isMouseDown.current = false
      })
    }
  }, [])

  const handleClickProgressBar = (e: any) => {
    const progressContainer = document.querySelector(
      `#${parentId}`
    ) as HTMLElement
    const progress = document.querySelector(
      `#${parentId} progress`
    ) as HTMLElement
    const circleContainer = document.querySelector(
      `#${parentId} .progress-bar__circle-container`
    ) as HTMLElement
    if (!progressContainer) return
    const progress_bar_left = progressContainer.getBoundingClientRect().left
    const progress_bar_right = progressContainer.getBoundingClientRect().right

    if (e.clientX >= progress_bar_left && e.clientX <= progress_bar_right) {
      const percent =
        (e.clientX - progress_bar_left + 1) /
        (progress_bar_right - progress_bar_left + 1)

      progressContainer.style.setProperty(
        `${cssProperty}`,
        `${percent * 100.0}`
      )
      progress.setAttribute('value', `${percent * 100.0}`)
      circleContainer.style.left = `${percent * 100.0}%`
    } else if (e.clientX < progress_bar_left) {
      progressContainer.style.setProperty(`${cssProperty}`, '0')
      progress.setAttribute('value', '0')
      circleContainer.style.left = `0%`
    } else if (e.clientX > progress_bar_right) {
      progressContainer.style.setProperty(`${cssProperty}`, '100')
      progress.setAttribute('value', '100')
      circleContainer.style.left = `100%`
    } else {
      return
    }
  }
  const handleDrag = (e: any) => {
    const progressContainer = document.querySelector(
      `#${parentId}`
    ) as HTMLElement
    const progress = document.querySelector(
      `#${parentId} progress`
    ) as HTMLElement
    const circleContainer = document.querySelector(
      `#${parentId} .progress-bar__circle-container`
    ) as HTMLElement

    if (!isMouseDown.current) return
    const progress_bar_left = progressContainer.getBoundingClientRect().left
    const progress_bar_right = progressContainer.getBoundingClientRect().right

    if (e.clientX >= progress_bar_left && e.clientX <= progress_bar_right) {
      const percent =
        (e.clientX - progress_bar_left + 1) /
        (progress_bar_right - progress_bar_left + 1)

      progressContainer.style.setProperty(
        `${cssProperty}`,
        `${percent * 100.0}`
      )
      progress.setAttribute('value', `${percent * 100.0}`)
      circleContainer.style.left = `${percent * 100.0}%`
    } else if (e.clientX < progress_bar_left) {
      progressContainer.style.setProperty(`${cssProperty}`, '0')
      progress.setAttribute('value', '0')
      circleContainer.style.left = `0%`
    } else if (e.clientX > progress_bar_right) {
      progressContainer.style.setProperty(`${cssProperty}`, '100')
      progress.setAttribute('value', '100')
      circleContainer.style.left = `100%`
    } else {
      return
    }
  }
  return (
    <Stack
      justifyContent={'center'}
      id={parentId}
      className={css`
        position: relative;
        height: 60px;
        max-height: 60px;
      `}
    >
      <progress
        className={css`
          max-height: 8px;
          width: 100%;
          accent-color: red;
          appearance: none;
          cursor: pointer;
          -webkit-appearance: none;
          &::-webkit-progress-bar {
            border: 1px solid #000;
            background-color: transparent;
            border-radius: 16px;
            overflow: hidden;
            height: 8px;
          }
          &::-webkit-progress-value {
            background-color: #000;
          }
        `}
        value={20}
        max={100}
      ></progress>
      <Stack
        className='progress-bar__circle-container'
        sx={{
          position: 'absolute',
          bottom: '50%',
          left: '20%',
          transform: 'translate(-50%, 50%)',
        }}
      >
        <SvgIconCustomized
          className={`progress-bar__circle`}
          component={Icons.Ellipse}
          sx={{
            fontSize: '64px',
            cursor: 'pointer',
          }}
        />
        <Box
          sx={{
            top: '50%',
            width: '100%',
            left: '50%',
            position: 'absolute',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Typography
            sx={{
              cursor: 'pointer',
            }}
            variant='body1'
            fontWeight={'medium'}
            textAlign={'center'}
            className={`progress-bar__circle-value`}
            color={'primary.main'}
          >
            2TB
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ProgressBarV2
