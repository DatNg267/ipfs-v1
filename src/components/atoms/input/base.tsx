import { TextField, styled } from '@mui/material'

export const InputBaseStyled = styled(TextField)(({ theme }) => ({
  ' .MuiInputBase-root.MuiInput-root': {
    '.Mui-focused': {
      '&:before': {
        borderBottom: '1px solid',
        borderColor: 'currentColor',
      },
    },
    '&:hover:not(.Mui-disabled, .Mui-error)': {
      '&:before': {
        borderBottom: '1px solid',
        borderColor: 'currentColor',
        // transform: 'scaleX(1) translateX(0)',
        // transition: 'transform cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      },
    },
    '&:after': {
      borderBottom: '1px solid black',
    },
    '.MuiInput-underline': {
      '&:before': {},
    },
  },
}))
