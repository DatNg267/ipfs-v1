import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import OutlineToggePasswordVisibility from '@/components/atoms/input/toggle-password-visibility'
import FormHeading from '@/components/molecules/form-heading'
import { AppRouter } from '@/constants/routers'
import { AppStatusAction } from '@/types'
import { FormErrorMessage } from '@/utils/error'
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
import { isEmpty } from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formRegisterSchema, registerFormDefaultValues } from '../data'
import { register } from '../hooks'
import { RegisterResponse } from '@/apis/auth/type'
import { useRouter } from 'next/router'
import FormWrap from './form-wrap'
import ButtonCustomized from '@/components/atoms/button'
import { AnimatePresence } from 'framer-motion'
import WrapperExpand from '@/components/molecules/wrapper-expand'
type Props = {
  handleSetEmail: (response: string) => void
  handleNextStep: () => void
}
const FormRegister = ({ handleSetEmail, handleNextStep }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formRegisterSchema),
    defaultValues: registerFormDefaultValues,
    mode: 'all',
  })

  const [status, setStatus] = useState<AppStatusAction>(null)
  const [error, setResponseError] = React.useState<string | null>(null)
  const router = useRouter()
  const onSubmit = async (data: any) => {
    setResponseError(null)
    setStatus('pending')
    await register({ ...data })
      .then(async (res) => {
        handleSetEmail(data.email)
        router.push(AppRouter.RESEND_MAIL + `?email=${data.email}`)
        setStatus('success')
      })
      .catch((err: Error) => {
        setResponseError(err.message)
        setStatus('fail')
      })
  }
  useEffect(() => {
    const subscription = watch((...props) => {
      const [data, input] = props
      if (input.name === 'password') {
        if (
          !isEmpty(data.password) &&
          !isEmpty(data.confirmPassword) &&
          data.password !== data.confirmPassword
        ) {
          setError('confirmPassword', {
            message:
              FormErrorMessage.CONFIRM_PASSWORD_MUST_BE_SAME_THE_NEW_PASSWORD,
            type: 'custome',
          })
        } else {
          clearErrors('confirmPassword')
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <FormWrap
      title='Create Your W3IPFS Account'
      typoTitleProps={{
        variant: 'h4',
      }}
      headingChildren={
        <Typography
          variant='body2'
          fontWeight={500}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          To get started with W3IPFS, please fill in the required fields below
          to create your account.
        </Typography>
      }
      onSubmit={handleSubmit(onSubmit)}
    >
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
        </AnimatePresence>
      </Box>

      {/* {!error && <Box height={39}></Box>} */}
      <Box>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              color='primary'
              placeholder='Email'
              fullWidth
              error={!!errors.email}
            />
          )}
        />
        <FormHelperTextCustomized error={!!errors.email?.message}>
          {errors.email?.message}
        </FormHelperTextCustomized>
      </Box>
      <Box>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'normal', md: 'flex-start' }}
          spacing={{ xs: 4, md: 8 }}
        >
          <Box flex={1}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  color='primary'
                  placeholder='First Name'
                  fullWidth
                  error={!!errors.firstName}
                />
              )}
            />
            <FormHelperTextCustomized error={!!errors.firstName?.message}>
              {errors.firstName?.message}
            </FormHelperTextCustomized>
          </Box>
          <Box flex={1}>
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  color='primary'
                  placeholder='Last Name'
                  fullWidth
                  error={!!errors.lastName}
                />
              )}
            />
            <FormHelperTextCustomized error={!!errors.lastName?.message}>
              {errors.lastName?.message}
            </FormHelperTextCustomized>
          </Box>
        </Stack>
      </Box>
      <OutlineToggePasswordVisibility
        name={'password'}
        error={errors.password}
        control={control}
        placeholder='Password'
      />
      <OutlineToggePasswordVisibility
        name={'confirmPassword'}
        error={errors.confirmPassword}
        control={control}
        placeholder='Confirm password'
      />
      {/* FOOTER */}
      <Stack
        component={'span'}
        direction='row'
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          variant='button'
          textTransform={'none'}
          color='text.secondary'
          fontWeight={{ xs: 400, md: 500 }}
          component='span'
          textAlign={'center'}
        >
          By registering you agree to
          <Box component={'br'} />
          our&nbsp;
          <Link href='#' passHref style={{ textDecoration: 'underline' }}>
            W3IPFS.STORAGE Terms of Use.
          </Link>
        </Typography>
      </Stack>
      <ButtonCustomized
        type='submit'
        variant='contained'
        color='secondary'
        fullWidth
        size='large'
        animateDisabled={status === 'pending'}
        onClick={(e) => {
          if (status === 'pending') {
            e.preventDefault()
            return
          }
        }}
        disabled={!isEmpty(errors) || !isValid}
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
        Create account
      </ButtonCustomized>
      <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
        <Typography
          component={'span'}
          variant='body2'
          textTransform={'none'}
          fontWeight={500}
        >
          Already have an account?&nbsp;
        </Typography>
        <Link href={AppRouter.LOGIN} passHref>
          <Typography variant='body2' textTransform={'none'} fontWeight={600}>
            Sign in
          </Typography>
        </Link>
      </Stack>
    </FormWrap>
  )
}

export default FormRegister
