import {
  ScrollBarModalStyled,
  ScrollBarStyled,
  breakpoints,
} from '@/themes/_theme'
import { Paper, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

type Props = {
  [key: string]: any
  children: any
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}
const MotionPaper = motion(Paper)
// eslint-disable-next-line react/display-name
const WrapperPopup = forwardRef(function (
  { children, ...props }: Props,
  ref: any
) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <MotionPaper
      style={style}
      initial={{
        y: '10%',
        opacity: 0,
        x: '-50%',
      }}
      animate={{
        opacity: 1,
        y: '-50%',
        x: '-50%',
      }}
      exit={{
        y: '10%',
        opacity: 0,
        x: '-50%',
      }}
      transition={{ type: 'spring', stiffness: 50 }}
      {...props}
      sx={{
        backgroundColor: 'transparent',
        p: 0,
        m: 0,
        maxHeight: '90vh',
        overflow: 'auto',
        width: '632px',
        ...(!isMobile && {
          ...ScrollBarModalStyled,
        }),
        [breakpoints.down('md')]: {
          width: '100vw',
          margin: 'auto',
        },
        ...(props ? props.sx : {}),
      }}
    >
      {children}
    </MotionPaper>
  )
})

export default WrapperPopup
