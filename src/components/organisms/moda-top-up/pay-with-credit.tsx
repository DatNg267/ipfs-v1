import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { appValidation } from '@/utils/validate'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { TopUpStep } from './types'

import TopUpModalHeading from './heading'
import ButtonCustomized from '@/components/atoms/button'

const formSchema = yup.object().shape({
  cardNumber: appValidation.creditCard,
  date: appValidation.creditCardExpirationDate,
  cvc: appValidation.cvc,
})

type Props = {
  handleChangeStep: (step: TopUpStep) => void
}

const PayWithCreditCard = ({ handleChangeStep }: Props) => {
  const handleCloseModal = useCloseModal()
  const user = useAppSelector((state) => state.auth.user)
  const {
    control,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      date: '',
      cvc: '',
    },
    mode: 'onChange',
  })
  return (
    <>
      <TopUpModalHeading title={'Credit Card'} />
      <Paper
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Controller
              name='cardNumber'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Card Number'
                  variant='standard'
                  fullWidth
                />
              )}
            />
            <FormHelperTextCustomized
              error={!!errors.cardNumber}
              sx={{
                mt: 2,
                ml: 0,
              }}
            >
              {errors.cardNumber?.message}
            </FormHelperTextCustomized>
          </Box>
          <Box>
            <Controller
              name='date'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='MM/YY'
                  variant='standard'
                  fullWidth
                  inputProps={{ maxLength: 5 }}
                />
              )}
            />
            <FormHelperTextCustomized
              error={!!errors.date}
              sx={{
                mt: 2,
                ml: 0,
              }}
            >
              {errors.date?.message}
            </FormHelperTextCustomized>
          </Box>
          <Box>
            <Controller
              name='cvc'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='CVC'
                  variant='standard'
                  fullWidth
                  onChange={(e) => {
                    if (e.target.value.length > 3) return
                    else {
                      field.onChange(e)
                    }
                  }}
                  inputProps={{ maxLength: 3 }}
                />
              )}
            />
            <FormHelperTextCustomized
              error={!!errors.cvc}
              sx={{
                mt: 2,
                ml: 0,
              }}
            >
              {errors.cvc?.message}
            </FormHelperTextCustomized>
          </Box>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <ButtonCustomized
              variant='outlined'
              color='secondary'
              fullWidth
              size='large'
              onClick={() => handleChangeStep('payment-method')}
            >
              Back
            </ButtonCustomized>
            <ButtonCustomized
              variant='contained'
              color='secondary'
              fullWidth
              size='large'
              disabled={!!errors || !isValid}
            >
              Confirm
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}

export default PayWithCreditCard
