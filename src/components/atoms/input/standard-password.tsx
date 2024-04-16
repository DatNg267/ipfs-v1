import { Icons } from '@/themes/_icons'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { SvgIconCustomized } from '../svg-icon'

type Props = {
  name: string
  control: any
  [key: string]: any
}

const StandardPasswordInput = ({ name, control, ...props }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant='standard'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? (
                    <SvgIconCustomized
                      sx={{ color: (theme) => theme.palette.text.primary }}
                      component={Icons.Eye}
                    />
                  ) : (
                    <SvgIconCustomized
                      sx={{ color: (theme) => theme.palette.text.primary }}
                      component={Icons.EyeOff}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& label': {
              fontWeight: 500,
            },
          }}
          {...props}
        />
      )}
    />
  )
}

export default StandardPasswordInput
