import { VerifyEmailReponse } from '@/apis/auth/type'
import ButtonCustomized from '@/components/atoms/button'
import Congratulation from '@/modules/login/components'
import FormHeading from '@/components/molecules/form-heading'
import { AppRouter, DEFAULT_AUTO_REDICRECT } from '@/constants'
import { useUpdateStateLogin } from '@/redux/auth/hooks'
import { Alert, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect } from 'react'

const VerifyEmailContent = ({
  status,
  data,
}: {
  status: 'error' | 'success'
  data: string | VerifyEmailReponse
}) => {
  const handleSetStateLogin = useUpdateStateLogin()
  useEffect(() => {
    if (data) {
      if (typeof data === 'string') {
      } else {
        handleSetStateLogin(data.access_token, data.refresh_token)
      }
    }
  }, [data])
  return (
    <Stack
      justifyContent={'center'}
      sx={{ height: '100%' }}
      spacing={8}
      padding={{ xs: 0, md: 8 }}
      overflow={'hidden'}
    >
      {status === 'success' && (
        <Congratulation
          pushHrefSuccess={AppRouter.IPFS_FILES}
          title='Congratulations !'
          description='Your account has been successfully created.'
          directionText='Go to dashboard'
        />
      )}
      {status === 'error' && (
        <>
          <FormHeading title='Verify email'></FormHeading>
          <Alert severity='error'>
            <Typography variant='body2' fontWeight={600}>
              {data as string}
            </Typography>
          </Alert>
          <Link href={AppRouter.LOGIN} passHref>
            <ButtonCustomized
              variant='contained'
              color='secondary'
              fullWidth
              size='large'
            >
              Back to login
            </ButtonCustomized>
          </Link>
        </>
      )}
    </Stack>
  )
}

export default VerifyEmailContent
