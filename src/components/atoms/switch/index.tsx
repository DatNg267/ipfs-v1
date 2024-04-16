import { Icons } from '@/themes/_icons'
import { Box, Switch, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import { SvgIconCustomized } from '../svg-icon'

const SwitchStyled = styled(Switch)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: 0,
  height: '32px',
  width: '64px',
  transition: 'all ease-in 0.2s',
  '& .MuiButtonBase-root': {
    padding: 4,
  },
  '& .MuiButtonBase-root.Mui-checked': {
    transform: 'translateX(32px)',
  },
  '& .MuiButtonBase-root.Mui-checked + .MuiSwitch-track': {
    opacity: 1,
  },
  '& .Mui-checked + .MuiSwitch-track': {
    borderRadius: '32px',
    border: '1px solid',
    borderColor: theme.palette.baseGray[800],
    backgroundColor: 'transparent',
    opacity: 1,
  },
  '& .MuiSwitch-track': {
    borderRadius: '32px',
    border: '1px solid',
    borderColor: theme.palette.baseGray[800],
    backgroundColor: 'transparent !important',
    opacity: 1,
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 24,
    height: 24,
    color: theme.palette.baseGray[800],
    opacity: 1,
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
  '& .MuiButtonBase-root.MuiSwitch-switchBase:hover': {
    backgroundColor: 'transparent',
  },
  '& .Mui-checked:hover': {
    backgroundColor: 'transparent',
  },
}))

type Props = {
  startIcon: ReactNode
  endIcon: ReactNode
  value: boolean
  onChange: (e: any, checked: boolean) => void
}
const SwitchCustomized = ({ startIcon, endIcon, value, onChange }: Props) => {
  return (
    <Box position={'relative'} sx={{ display: 'inline-block' }}>
      <SwitchStyled
        value={value}
        onChange={(e) => onChange(e, e.target.checked)}
        checked={value}
      />
      <SvgIconCustomized
        component={startIcon}
        sx={{
          position: 'absolute',
          color: 'white',
          fontSize: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '6px',
          zIndex: 1,
        }}
      />
      <SvgIconCustomized
        component={endIcon}
        sx={{
          position: 'absolute',
          color: 'white',
          fontSize: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '6px',
          zIndex: 1,
        }}
      />
    </Box>
  )
}

export default SwitchCustomized
