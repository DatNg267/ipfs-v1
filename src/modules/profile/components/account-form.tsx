import { authApis } from '@/apis/auth'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import StandardInput from '@/components/atoms/input/standard'
import { PaperStyled } from '@/components/atoms/paper'
import { authActions } from '@/redux/auth/reducer'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppStatusAction } from '@/types'
import { UserErrorMessage } from '@/utils/error'
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
  changeInfoFormDefaultValues,
  changeInfoFormSchema,
} from '../resources/data'
import { useEditProfile } from '../resources/hooks'
import ButtonCustomized from '@/components/atoms/button'

const AccountForm = () => {
  const editProfile = useEditProfile()
  const [statusUpload, setstatusUpload] = useState<AppStatusAction>(null)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [error, setError] = useState<string | null>(null)
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: changeInfoFormDefaultValues,
    values: {
      ...{
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      },
    },
    resolver: yupResolver(changeInfoFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error(UserErrorMessage.AN_ERROR_HAS_OCCURRED)
      return
    } else {
      setstatusUpload('pending')
      await editProfile({
        firstName: data.first_name,
        lastName: data.last_name,
      })
        .then(async (res) => {
          toast.success('Change info successfully')
          setError(null)
          setstatusUpload('success')
          try {
            const userInfo = await authApis.getInfoUser()
            dispatch(authActions.updateUser(userInfo.data.user))
          } catch (error) {}
        })
        .catch((err) => {
          toast.error(err.message)
          setError(err.message)
          setstatusUpload('fail')
        })
    }
  }
  const userFirstName = watch('first_name')
  const userLastName = watch('last_name')

  const isEmailChanged =
    user?.first_name !== userFirstName || user?.last_name !== userLastName
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: { xs: '16px', md: '28px' },
        m: 0,
        flex: 1,
        justifyContent: 'flex-end',
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
            Account Info
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
              <StandardInput
                name={'email'}
                control={control}
                label='Email'
                disabled={true}
                fullWidth
              />
              <FormHelperTextCustomized
                error={!!errors.email}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.email?.message}
              </FormHelperTextCustomized>
            </Box>
            <Box>
              <StandardInput
                name={'first_name'}
                control={control}
                label='First name'
                fullWidth
              />

              <FormHelperTextCustomized
                error={!!errors.first_name}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.first_name?.message}
              </FormHelperTextCustomized>
            </Box>
            <Box>
              <StandardInput
                name={'last_name'}
                control={control}
                label='Last name'
                fullWidth
              />

              <FormHelperTextCustomized
                error={!!errors.last_name}
                sx={{
                  mt: 2,
                  ml: 0,
                }}
              >
                {errors.last_name?.message}
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
              size='large'
              animateDisabled={statusUpload === 'pending'}
              type={statusUpload === 'pending' ? undefined : 'submit'}
              disabled={!isEmpty(errors) || !isValid || !isEmailChanged}
              onClick={(e) => {
                if (statusUpload === 'pending') {
                  e.preventDefault()
                  return
                }
              }}
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
              {' '}
              Edit
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export default AccountForm
