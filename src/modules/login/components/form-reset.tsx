import Congratulation from '@/modules/login/components'
import FormHeading from '@/components/molecules/form-heading'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import OutlineToggePasswordVisibility from '@/components/atoms/input/toggle-password-visibility'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter, DEFAULT_RESEND_EMAIL_TIME } from '@/constants'
import useCountdown from '@/hooks/useCountDown'
import { AppStatusAction } from '@/types'
import { Icons } from '@/themes/_icons'
import { fontSize } from '@/themes/font'
import { FormErrorMessage } from '@/utils/error'
import { addLeadingZero, isNumeric } from '@/utils/tools'
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
import { isEmpty, isNumber } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formResetPasswordSchema, resetFormDefaultValues } from '../data/reset'
import { resetPassword, sendEmail } from '../hooks'
import ButtonCustomized from '@/components/atoms/button'
import Back from './back'
import { AnimatePresence } from 'framer-motion'
import WrapperExpand from '@/components/molecules/wrapper-expand'

const ResetPasswordForm = () => {
  const router = useRouter()
  const [success, setSuccess] = React.useState<boolean>(false)
  const { isRunning, countdown, start, stop, reset } = useCountdown(
    DEFAULT_RESEND_EMAIL_TIME
  )
  const [error, setResponseError] = React.useState<string | null>(null)
  const [status, setStatus] = useState<AppStatusAction>(null)

  const {
    control,
    watch,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formResetPasswordSchema),
    defaultValues: resetFormDefaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    setResponseError(null)
    setStatus('pending')
    await resetPassword({ ...data, email: router.query.email })
      .then(() => {
        setSuccess(true)
        setStatus('success')
        setTimeout(() => {
          router.push(AppRouter.LOGIN)
        }, 5000)
      })
      .catch((err) => {
        setResponseError(err.message)
        setStatus('fail')
      })
  }
  const handleResendMail = async () => {
    await sendEmail({ email: router.query.email as string })
      .then((res) => {
        setResponseError(null)
      })
      .catch((res: Error) => {
        setResponseError(res.message)
      })
  }
  useEffect(() => {
    start()
  }, [])
  useEffect(() => {
    const subscription = watch((...props) => {
      const [data, input] = props

      if (input.name === 'newPassword' && !isEmpty(data.newPassword)) {
        if (
          data.newPassword !== data.confirmPassword &&
          !isEmpty(data.confirmPassword)
        ) {
          setError('confirmPassword', {
            message:
              FormErrorMessage.CONFIRM_PASSWORD_MUST_BE_SAME_THE_NEW_PASSWORD,
          })
        } else {
          clearErrors('confirmPassword')
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Stack
      component={'form'}
      justifyContent={'center'}
      sx={{ height: '100%' }}
      spacing={{ xs: 4, md: '28px' }}
      padding={{ xs: 0, md: 8 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {success && (
        <Congratulation
          pushHrefSuccess={AppRouter.LOGIN}
          title='Password Updated !'
          description='Your password has been changed successfully.'
        ></Congratulation>
      )}
      {!success && (
        <>
          <FormHeading title='Reset password' />
          <Box>
            <Typography
              variant='body2'
              component={'p'}
              sx={{
                wordWrap: 'break-word',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Please check your inbox for the verification code sent to&nbsp;
              <b>{router.query.email}</b>
            </Typography>
          </Box>
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
            </AnimatePresence>
          </Box>

          <Box>
            <Controller
              name='code'
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  color='primary'
                  placeholder='Code'
                  fullWidth
                  type='text'
                  onChange={(e) => {
                    if (e.target.value.length > 6) {
                      return
                    }
                    try {
                      const value = isNumeric(e.target.value)
                      if (value || e.target.value === '') {
                        field.onChange(e)
                      }
                    } catch (error) {}
                  }}
                />
              )}
            />
            <FormHelperTextCustomized error={!!errors.code?.message}>
              {errors.code?.message}
            </FormHelperTextCustomized>
          </Box>
          <OutlineToggePasswordVisibility
            name={'newPassword'}
            error={errors.newPassword}
            control={control}
            placeholder='New password'
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
              variant='body2'
              color='text.secondary'
              fontWeight={400}
              component={'span'}
            >
              Haven’t received the code? code again&nbsp;
              <Button
                component={'span'}
                variant='text'
                sx={{
                  width: 'fit-content',
                  height: 'fit-content',
                  padding: `0 !important`,
                  m: 0,
                  mb: 1 / 2,
                  minWidth: 'unset',
                  ...fontSize[16],
                  textDecoration: 'underline',

                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  '&.Mui-disabled': {
                    color: 'text.primary',
                  },
                }}
                disabled={isRunning}
                onClick={() => {
                  start()
                  handleResendMail()
                }}
              >
                {isRunning ? `00: ${addLeadingZero(countdown)}` : 'send'}
              </Button>
              &nbsp;code again
            </Typography>
          </Stack>

          <ButtonCustomized
            type={status === 'pending' ? undefined : 'submit'}
            variant='contained'
            color='secondary'
            fullWidth
            size='large'
            animateDisabled={status === 'pending'}
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
            Reset password
          </ButtonCustomized>

          <Back href={AppRouter.LOGIN} title={'Back to login'}></Back>
        </>
      )}
    </Stack>
  )
}

export default ResetPasswordForm
