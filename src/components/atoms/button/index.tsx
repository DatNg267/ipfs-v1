import { css } from '@emotion/css'
import { Box, Button, ButtonProps, keyframes, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'

const DURATION_OVER = 0.2
const DURATION_OUT = 0.3
const ButtonCustomized = ({
  animateDisabled = false,
  ...props
}: ButtonProps & {
  animateDisabled?: boolean
}) => {
  const theme = useTheme()
  const [exit, setExit] = useState(false)
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExit(false)
    if (props && props.onMouseOver) {
      props.onMouseOver(e)
    }
  }
  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExit(true)
    if (props && props.onMouseLeave) {
      props.onMouseLeave(e)
    }
  }
  const objAnimate = useMemo(() => {
    return {
      '0%': { left: '0%', opacity: 1, transform: 'translateX(-100%)' },
      '100%': {
        left: '50%',
        opacity: 0,
        transform: 'translateX(-50%)',
      },
    }
  }, [])

  const animateLeft = useMemo(() => {
    return keyframes`
  ${objAnimate}
  `
  }, [objAnimate])

  const objAnimateRight = useMemo(() => {
    return {
      '0%': { right: '0%', opacity: 1, transform: 'translateX(100%)' },
      '100%': {
        right: '50%',
        opacity: 0,
        transform: 'translateX(50%)',
      },
    }
  }, [])

  const objAnimateLeftOut = useMemo(() => {
    return {
      '0%': {
        left: '50%',
        opacity: 1,
        transform: 'translateX(-50%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.primary.dark,
      },
      '10%': {
        left: '50%',
        opacity: 1,
        transform: 'translateX(-50%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.primary.dark,
      },
      '100%': {
        left: '0%',
        opacity: 1,
        transform: 'translateX(-100%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.baseGray[1000],
      },
    }
  }, [
    props,
    theme.palette.background.paper,
    theme.palette.baseGray,
    theme.palette.primary.dark,
  ])

  const animateLeftOut = useMemo(() => {
    return keyframes`
  ${objAnimateLeftOut}`
  }, [objAnimateLeftOut])

  const animateRight = useMemo(() => {
    return keyframes`
  ${objAnimateRight}`
  }, [objAnimateRight])

  const objAnimateRightOut = useMemo(() => {
    return {
      '0%': {
        right: '50%',
        opacity: 1,
        transform: 'translateX(50%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.primary.dark,
      },
      '10%': {
        right: '50%',
        opacity: 1,
        transform: 'translateX(50%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.primary.dark,
      },
      '100%': {
        right: '0%',
        opacity: 1,
        transform: 'translateX(100%)',
        backgroundColor:
          props && props.color === 'error'
            ? theme.palette.background.paper
            : theme.palette.baseGray[1000],
      },
    }
  }, [])

  const animateRightOut = useMemo(() => {
    return keyframes`
  ${objAnimateRightOut}`
  }, [objAnimateRightOut])

  const animateExit = useMemo(() => {
    return css`
      & .button-circle-left {
        left: 50%;
        opacity: 1;
        transform: translateX(50%);
        background-color: ${theme.palette.background.paper};
        animation: ${animateLeftOut} ease-out ${DURATION_OUT}s forwards;
      }
      & .button-circle-right {
        right: 50%;
        opacity: 1;
        transform: translateX(50%);
        background-color: ${theme.palette.background.paper};
        animation: ${animateRightOut} ease-out ${DURATION_OUT}s forwards;
      }
    `
  }, [animateLeftOut, animateRightOut, theme.palette.background.paper])

  const animateNotExit = useMemo(() => {
    return css`
      &:hover {
        & .button-circle-left {
          animation: ${animateLeft} ease-out ${DURATION_OVER}s forwards;
        }
        & .button-circle-right {
          animation: ${animateRight} ease-out ${DURATION_OVER}s forwards;
        }
      }
    `
  }, [animateLeft, animateRight])
  return (
    <Button
      className={exit ? animateExit : animateNotExit}
      variant='contained'
      color='primary'
      size='large'
      {...props}
      onMouseLeave={handleMouseOut}
      onMouseOver={handleMouseOver}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        transition: `all ease-out ${DURATION_OVER}s`,
        '& .MuiButton-endIcon': {
          marginTop: 0,
          marginLeft: 1,
        },
        '& .MuiButton-startIcon': {
          marginTop: 0,
          marginRight: 1,
        },
        '&:hover': {
          '& .button-circle-left': {
            animation: `${animateLeft} ease-out ${DURATION_OVER}s forwards`,
          },
          '& .button-circle-right': {
            animation: `${animateRight} ease-out ${DURATION_OVER}s forwards`,
          },
        },
        '&.MuiButton-sizeLarge': {
          '& .MuiBox-root': {
            height: '44px',
            width: '44px',
          },
        },
        '&.MuiButton-sizeMedium': {
          '& .MuiBox-root': {
            height: '36px',
            width: '36px',
          },
        },
        '&.MuiButton-sizeSmall': {
          '& .MuiBox-root': {
            height: '28px',
            width: '28px',
          },
        },
        ...(props && props.sx ? props.sx : {}),
      }}
    >
      {props.children}
      <Box
        className='button-circle-left'
        sx={{
          borderRadius: '50%',
          position: 'absolute',
          left: 0,
          height: '44px',
          width: '44px',
          transform: 'translateX(-100%)',
          backgroundColor:
            props && props.color === 'error'
              ? (theme) => theme.palette.background.paper
              : props &&
                props.color === 'secondary' &&
                props.variant === 'contained'
              ? (theme) => theme.palette.background.paper
              : (theme) => theme.palette.baseGray[1000],

          animation: animateDisabled ? 'none !important' : '',
          display: animateDisabled ? 'none !important' : 'block',
        }}
      ></Box>
      <Box
        className='button-circle-right'
        sx={{
          borderRadius: '50%',
          position: 'absolute',
          right: 0,
          height: '44px',
          width: '44px',
          transform: 'translateX(100%)',
          backgroundColor:
            props && props.color === 'error'
              ? (theme) => theme.palette.background.paper
              : props &&
                props.color === 'secondary' &&
                props.variant === 'contained'
              ? (theme) => theme.palette.background.paper
              : (theme) => theme.palette.baseGray[1000],
          animation: animateDisabled ? 'none !important' : '',
          display: animateDisabled ? 'none !important' : 'block',
        }}
      ></Box>
    </Button>
  )
}

export default ButtonCustomized
