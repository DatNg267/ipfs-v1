import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { IconButton, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import React, { useRef } from 'react'
import { Controller } from 'react-hook-form'
import FormHelperTextCustomized from '../form-helper-text'
type Props = {
  error?: any
  control: any
  name: string
  placeholder?: string
  showError?: boolean
  [key: string]: any
}

const OutlineToggePasswordVisibility = ({
  name,
  error,
  control,
  placeholder,
  showError = true,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const ref = useRef()

  const handleClickShowPassword = () => {
    // if (!ref.current) return
    // const inputWrapper = ref.current as HTMLDivElement
    // if (!inputWrapper) return

    // const input = inputWrapper.querySelector('input') as HTMLInputElement
    // if (!input) return
    // console.log(input.value.length)
    // input.selectionEnd = input.value.length
    // input.selectionStart = input.value.length
    // input.focus()
    setShowPassword((show) => !show)
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <Stack>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            ref={ref}
            color='primary'
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  sx={{
                    tabIndex: -1,
                  }}
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
            }
            {...props}
          />
        )}
      />
      {showError && (
        <FormHelperTextCustomized error={!!error?.message}>
          {error?.message}
        </FormHelperTextCustomized>
      )}
    </Stack>
  )
}

export default OutlineToggePasswordVisibility
