import ButtonCustomized from '@/components/atoms/button'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { AppRouter } from '@/constants/routers'
import { Icons } from '@/themes/_icons'
import { AppStatusAction } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  CircularProgress,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formForgotSchema } from '../data'
import { sendEmail } from '../hooks'
import FormWrap from './form-wrap'
import Back from './back'
import { AnimatePresence, motion } from 'framer-motion'
import WrapperExpand from '@/components/molecules/wrapper-expand'

const SendEmailForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<AppStatusAction>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formForgotSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    setError(null)
    setStatus('pending')
    await sendEmail({ ...data })
      .then(async (res) => {
        await router.push(AppRouter.RESET_PASSWORD + `?email=${data.email}`)
        setStatus('success')
      })
      .catch((res: Error) => {
        setError(res.message)
        setStatus('fail')
      })
  }
  return (
    <FormWrap
      title='Reset password'
      onSubmit={handleSubmit(onSubmit)}
      headingChildren={
        <Typography
          variant='body2'
          fontWeight={500}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Lost your password? Please enter your email address.<br></br> You will
          receive s link to create a new password via email.
        </Typography>
      }
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

      {/* FOOTER */}

      <ButtonCustomized
        type='submit'
        variant='contained'
        color='secondary'
        fullWidth
        size='large'
        animateDisabled={status === 'pending'}
        disabled={!isEmpty(errors) || !isValid}
        onClick={(e) => {
          if (status === 'pending') {
            e.preventDefault()
            return
          }
        }}
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
        Send Email Recovery
      </ButtonCustomized>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
        spacing={1}
      >
        <Back href={AppRouter.LOGIN} title={'Back to login'}></Back>
      </Stack>
    </FormWrap>
  )
}

export default SendEmailForm
