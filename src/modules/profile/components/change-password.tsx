import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import StandardPasswordInput from '@/components/atoms/input/standard-password'
import { PaperStyled } from '@/components/atoms/paper'
import { useAppSelector } from '@/redux/hooks'
import { AppStatusAction } from '@/types'
import {
  AppSuccessMessage,
  FormErrorMessage,
  UserErrorMessage,
} from '@/utils/error'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  changePasswordDefaultValues,
  changePasswordFormSchema,
} from '../resources/data'
import { useChangePassword } from '../resources/hooks'
import ButtonCustomized from '@/components/atoms/button'

const ChangePasswordForm = () => {
  const [statusUpload, setstatusUpload] = useState<AppStatusAction>(null)
  const changePassword = useChangePassword()

  const user = useAppSelector((state) => state.auth.user)
  const [error, setErrors] = useState<any | null>(null)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: changePasswordDefaultValues,
    resolver: yupResolver(changePasswordFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error(UserErrorMessage.AN_ERROR_HAS_OCCURRED)
      return
    } else {
      setErrors(null)
      setstatusUpload('pending')
      await changePassword({
        confirmNewPassword: data.confirmPassword,
        newPassword: data.newPassword,
        email: user?.email,
        password: data.currentPassword,
      })
        .then((res) => {
          toast.success(AppSuccessMessage.CHANGE_PASSWORD_SUCCESS)
          setErrors(null)
          setstatusUpload('success')
          reset({ ...changePasswordDefaultValues })
        })
        .catch((err) => {
          toast.error(
            err.message === UserErrorMessage.WRONG_EMAIL_OR_PASSWORD
              ? 'Wrong password'
              : err.message
          )
          setErrors(
            err.message === UserErrorMessage.WRONG_EMAIL_OR_PASSWORD
              ? 'Wrong password'
              : err.message
          )
          setstatusUpload('fail')
        })
    }
  }
  useEffect(() => {
    const subscription = watch((...props) => {
      const [data, input] = props
      if (
        input.name === 'currentPassword' &&
        !isEmpty(data.currentPassword) &&
        !isEmpty(data.newPassword)
      ) {
        if (data.currentPassword === data.newPassword) {
          setError('newPassword', {
            message: FormErrorMessage.NEW_PASSWORD_DIFFERENT_CURRENT_PASSWORD,
          })
        } else {
          clearErrors('newPassword')
        }
        return
      }

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

        if (
          data.newPassword === data.currentPassword &&
          !isEmpty(data.currentPassword)
        ) {
          setError('newPassword', {
            message: FormErrorMessage.NEW_PASSWORD_DIFFERENT_CURRENT_PASSWORD,
          })
        } else {
          clearErrors('newPassword')
        }
        return
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: { xs: '16px', md: '28px' },
        m: 0,
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '931px',
          flex: 1,
        }}
      >
        <Stack
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          spacing={'28px'}
        >
          <Typography variant='h4' fontWeight={700}>
            Change Password
          </Typography>
          {error && (
            <Box>
              <Alert severity='error'>
                <Typography variant='body2' fontWeight={600}>
                  {error}
                </Typography>
              </Alert>
            </Box>
          )}
          <Stack spacing={'16px'}>
            <Box>
              <StandardPasswordInput
                name={'currentPassword'}
                control={control}
                label='Current password'
                fullWidth
              />
              <FormHelperTextCustomized
                error={!!errors.currentPassword}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.currentPassword?.message}
              </FormHelperTextCustomized>
            </Box>

            {/* NEW PASSWORD */}
            <Box>
              <StandardPasswordInput
                name={'newPassword'}
                control={control}
                label='New password'
                fullWidth
              />

              <FormHelperTextCustomized
                error={!!errors.newPassword}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.newPassword?.message}
              </FormHelperTextCustomized>
            </Box>

            {/* CONFIRM PASSWORD */}
            <Box>
              <StandardPasswordInput
                name={'confirmPassword'}
                control={control}
                label='Confirm new password'
                fullWidth
              />
              <FormHelperTextCustomized
                error={!!errors.confirmPassword}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.confirmPassword?.message}
              </FormHelperTextCustomized>
            </Box>
          </Stack>

          <Stack alignItems={'flex-end'}>
            <ButtonCustomized
              variant='contained'
              color='secondary'
              sx={{
                width: { xs: '100%', md: 'fit-content' },
                padding: '8px 58px',
              }}
              animateDisabled={statusUpload === 'pending'}
              size='large'
              type={statusUpload === 'pending' ? undefined : 'submit'}
              disabled={!isEmpty(errors) || !isValid}
              startIcon={
                statusUpload === 'pending' && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary',
                    }}
                  ></CircularProgress>
                )
              }
            >
              Save
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export default ChangePasswordForm
