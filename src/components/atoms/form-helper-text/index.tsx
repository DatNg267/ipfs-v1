import { fontSize } from '@/themes/font'
import { Box, FormHelperText } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type Props = {
  error: boolean
  [key: string]: any
  children: ReactNode
}
const MotionBox = motion(Box)
const FormHelperTextCustomized = ({ error, children, ...props }: Props) => {
  return (
    <Box>
      <AnimatePresence>
        {error && (
          <MotionBox
            initial={{
              height: 0,
            }}
            animate={{
              height: 'auto',
            }}
            exit={{
              height: 0,
            }}
            style={{
              overflow: 'hidden',
            }}
          >
            <FormHelperText
              error={error}
              {...props}
              sx={{
                fontWeight: 500,
                ...fontSize[14],
                ml: 4,
                ...(props && props.sx),
              }}
            >
              {children ? `*${children}` : children}
            </FormHelperText>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default FormHelperTextCustomized
