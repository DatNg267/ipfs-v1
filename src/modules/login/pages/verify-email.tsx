import { authApis } from '@/apis/auth'
import ButtonCustomized from '@/components/atoms/button'
import FormHeading from '@/components/molecules/form-heading'
import { AppRouter } from '@/constants'
import { useUpdateStateLogin } from '@/redux/auth/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { OutlinedInput, Stack } from '@mui/material'
import Link from 'next/link'
import { Controller } from 'react-hook-form'

import { useForm } from 'react-hook-form'

import * as yup from 'yup'

export const formLoginSchema = yup.object({
  code: yup.string(),
})

const VerifyEmailContent = ({}: {}) => {
  const handleSetStateLogin = useUpdateStateLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onSubmit',
  })
  const handleClick = async (data: any) => {
    authApis.verifyEmail(data).then((res) => {})
  }
  return (
    <Stack
      justifyContent={'center'}
      sx={{ height: '100%' }}
      spacing={8}
      padding={{ xs: 0, md: 8 }}
      overflow={'hidden'}
    >
      <>
        <FormHeading title='Verify code'></FormHeading>

        <Controller
          name='code'
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              autoFocus
              color='primary'
              placeholder='Code'
              fullWidth
              error={!!errors.code}
              tabIndex={1}
            />
          )}
        />
        <ButtonCustomized
          variant='contained'
          color='secondary'
          fullWidth
          size='large'
        >
          verify
        </ButtonCustomized>
        <Link href={AppRouter.LOGIN} passHref>
          Back to login
        </Link>
      </>
    </Stack>
  )
}

export default VerifyEmailContent
