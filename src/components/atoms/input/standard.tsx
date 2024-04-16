import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'

type Props = {
  name: string
  control: any
  [key: string]: any
} & TextFieldProps

const StandardInput = ({ name, control, ...props }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant='standard'
          fullWidth
          {...props}
          sx={{
            '& label': {
              fontWeight: 500,
            },
          }}
        />
      )}
    />
  )
}

export default StandardInput
