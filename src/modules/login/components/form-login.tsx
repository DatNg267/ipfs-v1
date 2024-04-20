import FormHeading from '@/components/molecules/form-heading'
import OutlineToggePasswordVisibility from '@/components/atoms/input/toggle-password-visibility'
import { AppRouter } from '@/constants/routers'
import { resendEmail, useLogin } from '../hooks'
import { UserErrorMessage } from '@/utils/error'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppStatusAction } from '@/types'
import { Icons } from '@/themes/_icons'
import { formLoginSchema } from '../data'
import FormWrap from './form-wrap'
import ButtonCustomized from '@/components/atoms/button'
import Back from './back'
import WrapperExpand from '@/components/molecules/wrapper-expand'
import { AnimatePresence } from 'framer-motion'

type Props = {}

const FormLogin = (props: Props) => {
  const handleLogin = useLogin()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })
  const [status, setStatus] = useState<AppStatusAction | 'verify'>(null)

  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (data: any) => {
    console.log('dsadas')
    setError(null)
    setStatus('pending')
    await handleLogin({ ...data })
      .then(async (res) => {
        await router.push(AppRouter.VERIFY_EMAIL + `?email=${data.email}`)
        setStatus('success')
      })
      .catch(async (err: Error) => {
        if (err.message === UserErrorMessage.USER_NOT_VERIFIED) {
          router.push(AppRouter.RESEND_MAIL + `?email=${data.email}`)
        } else {
          setError(err.message)
          setStatus('fail')
        }
      })
  }
  return (
    <FormWrap
      title='Login'
      onSubmit={handleSubmit(onSubmit)}
      headingChildren={
        <Typography
          variant='body2'
          fontWeight={500}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Good to see you again!
        </Typography>
      }
    >
      {/* FORM */}
      <Box>
        <AnimatePresence>
          {error && (
            <WrapperExpand>
              <Alert severity='error'>
                <Typography variant='body2' fontWeight={600}>
                  {error}
                </Typography>
              </Alert>
            </WrapperExpand>
          )}
          {status === 'verify' && (
            <WrapperExpand>
              <Alert severity='error'>
                <Typography variant='body2' fontWeight={600}>
                  Please check your email. You need to verify your email to
                  continue.
                </Typography>
              </Alert>
            </WrapperExpand>
          )}
        </AnimatePresence>
      </Box>

      <Box>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              autoFocus
              color='primary'
              placeholder='Email'
              fullWidth
              error={!!errors.email}
              tabIndex={1}
            />
          )}
        />
        <FormHelperTextCustomized error={!!errors.email?.message}>
          {errors.email?.message}
        </FormHelperTextCustomized>
      </Box>
      <Box>
        <OutlineToggePasswordVisibility
          name={'password'}
          error={errors.password}
          control={control}
          placeholder='Password'
          showError={false}
          tabIndex={2}
        />
        <FormHelperTextCustomized error={!!errors.password?.message}>
          {errors.password?.message}
        </FormHelperTextCustomized>
      </Box>

      {/* FOOTER */}
      <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
        <Link href={AppRouter.FORGOT_PASSWORD} passHref>
          <Typography
            variant='button'
            textTransform={'none'}
            color='text.secondary'
            fontWeight={500}
            sx={{
              '&:hover': {
                color: 'text.primary',
                textDecoration: 'underline',
                fontWeight: 500,
              },
            }}
          >
            Forgot password
          </Typography>
        </Link>
      </Stack>
      <ButtonCustomized
        type='submit'
        variant='contained'
        color='secondary'
        fullWidth
        size='large'
        animateDisabled={status === 'pending'}
        startIcon={
          status === 'pending' && (
            <CircularProgress
              size={22}
              sx={{
                color: 'primary',
              }}
            />
          )
        }
      >
        Login
      </ButtonCustomized>
      <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
        <Typography
          component={'span'}
          variant='body2'
          textTransform={'none'}
          fontWeight={500}
        >
          No account yet?
        </Typography>
        <Link href={AppRouter.REGISTER} passHref>
          <Typography variant='body2' textTransform={'none'} fontWeight={600}>
            &nbsp;Create now
          </Typography>
        </Link>
      </Stack>
      <Back href={AppRouter.HOME} title={'Back to home'}></Back>
    </FormWrap>
  )
}

export default FormLogin
