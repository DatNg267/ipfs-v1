import { Switch, styled } from '@mui/material'

export const SwitchStyled = styled(Switch)(({ theme }) => {
  return {
    width: '40px',
    paddingLeft: '0px',
    overflow: 'unset',
    paddingRight: '0px',
    '& .MuiSwitch-switchBase': {
      padding: '7px',
      paddingLeft: 0,
      paddingRight: 0,
      '&.Mui-checked': {
        color: 'currentColor',
        '& .MuiSwitch-thumb': {
          backgroundColor: 'currentColor',
        },
        '& + .MuiSwitch-track': {
          backgroundColor: 'currentColor',
        },
      },
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.baseGray[500],
      width: '24px',
      height: '24px',
    },
    '& .MuiSwitch-track': {
      backgroundColor: theme.palette.baseGray[300],
    },
  }
})
