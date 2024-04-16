import {
  Box,
  Stack,
  StackProps,
  SvgIcon,
  SvgIconProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import React, { useState } from 'react'
import { SvgIconCustomized } from '../../atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import Copied from './copied'
import { breakpoints } from '@/themes/_theme'
import { ZINDEX_COPY_TEXT } from '@/constants/ui-index'

type Props = {
  typoProps?: TypographyProps
  iconProps?: SvgIconProps
  copyText: string
  showText: string
  wrapperProps?: StackProps
}

const CopyClipboardText = ({
  typoProps,
  iconProps,
  showText,
  copyText,
  wrapperProps,
}: Props) => {
  const [show, setShow] = useState(false)
  const handleShow = () => {
    navigator.clipboard.writeText(copyText)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 300)
  }
  return (
    <Box sx={{}}>
      <Stack
        component={'span'}
        direction='row'
        onClick={handleShow}
        {...wrapperProps}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          width: 'fit-content',
          ...wrapperProps?.sx,
        }}
        spacing={1}
      >
        <Typography component={'span'} {...typoProps}>
          {showText}
          <SvgIconCustomized
            component={Icons.Copy}
            {...iconProps}
            sx={{ marginLeft: 1, marginBottom: '-4px', fontSize: '24px' }}
          />
        </Typography>

        <Box sx={{ position: 'relative', height: '4px' }}>
          {show && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '120%',
                [breakpoints.up('md')]: {
                  left: '-10%',
                },
                [breakpoints.down('md')]: {
                  right: '0px',
                },
                zIndex: ZINDEX_COPY_TEXT,
              }}
            >
              <Copied />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default CopyClipboardText
