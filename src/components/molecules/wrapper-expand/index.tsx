import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
const MotionBox = motion(Box)
const WrapperExpand = ({ children }: Props) => {
  return (
    <MotionBox
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: 'auto',
        opacity: 1,
      }}
      exit={{
        height: 0,
      }}
      style={{
        overflow: 'hidden',
      }}
    >
      {children}
    </MotionBox>
  )
}

export default WrapperExpand
