import { PAY_DATA } from '@/constants'
import { css } from '@emotion/css'
import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const InputStyled = css`
  padding-top: 32px;
  padding-bottom: 32px;

  font-size: 16px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;

  /***** Track Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  &::-webkit-slider-runnable-track {
    background: #000;
    height: var(--track-height);
    border-radius: 16px;
  }

  /******** Firefox ********/
  &::-moz-range-track {
    background: #000;
    height: var(--track-height);
  }
  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: calc(((var(--track-height) / 2) - (var(--thumb-height) / 2)));
    height: var(--thumb-height);
    width: var(--thumb-height);
    border-radius: 50%;
    background-color: #000;
  }
  /***** Firefox *****/
  &::-moz-range-thumb {
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0; /*Removes default border-radius that FF applies*/
    height: var(--thumb-height);
    width: var(--thumb-height);
    border-radius: 50%;
    background-color: #000;
  }
`
type Props = {
  defaultValue: number
  id: string
  max: number
}

// eslint-disable-next-line react/display-name
const InputRangeCustomized = forwardRef<any, any>(
  ({ defaultValue, max, id }: Props, ref) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const thumbHeight = isMobile ? 48 : 60
    const valueRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const onChange = (e: any) => {
      if (!valueRef.current || !wrapperRef.current) {
        return
      }
      const wrapperWidth = wrapperRef.current.offsetWidth
      valueRef.current.style.left = `calc(${
        (e.target.value * (wrapperWidth - thumbHeight)) / 100
      }px)`
      const inputStorage = document.querySelector(`#${id}`) as HTMLElement
      inputStorage.setAttribute('value', e.target.value)

      valueRef.current.innerHTML =
        Math.round((e.target.value * max) / 100).toString() + ' TB'
      // handleChange(e.target.value)
    }
    const handleWindowResize = () => {
      if (!valueRef.current || !wrapperRef.current) {
        return
      }
      const input = document.querySelector(`#${id}`) as any
      const wrapperWidth = wrapperRef.current.offsetWidth
      valueRef.current.style.left = `calc(${
        (input.value * (wrapperWidth - thumbHeight)) / 100
      }px)`
    }
    useEffect(() => {
      if (wrapperRef.current && valueRef.current) {
        const wrapper = document.querySelector('#input-range') as HTMLElement
        const wrapperWidth = wrapperRef.current.offsetWidth
        valueRef.current.style.left = `calc(${
          (defaultValue * (wrapperWidth - thumbHeight)) / 100
        }px)`
        valueRef.current.innerHTML =
          Math.round((defaultValue * max) / 100).toString() + ' TB'
        window.addEventListener('resize', handleWindowResize)
        return () => {
          window.removeEventListener('resize', handleWindowResize)
        }
      }
    }, [defaultValue, max, thumbHeight])

    return (
      <>
        <Stack
          id='input-range'
          ref={wrapperRef}
          sx={{
            position: 'relative',
            ['--track-height']: '8px',
            ['--thumb-height']: `${thumbHeight}px`,
            width: '100%',
          }}
        >
          <input
            ref={ref}
            id={id}
            className={InputStyled}
            type='range'
            max={100}
            min={0}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          <Typography
            textAlign={'center'}
            ref={valueRef}
            sx={{
              pointerEvents: 'none',
              verticalAlign: 'middle',
              width: `var(--thumb-height)`,
              height: `var(--thumb-height)`,
              lineHeight: `var(--thumb-height) !important`,
              position: 'absolute',
              top: '50%',
              left: `0%`,
              zIndex: 100,
              color: 'primary.main',
              transform: `translate(0%,-50%)`,
            }}
          ></Typography>
        </Stack>
      </>
    )
  }
)

export default InputRangeCustomized
