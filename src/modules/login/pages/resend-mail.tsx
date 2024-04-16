import ButtonCustomized from '@/components/atoms/button'
import { AppRouter } from '@/constants'
import { Alert, Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import FormWrap from '../components/form-wrap'
import { resendEmail } from '../hooks'

const ResendMailContent = () => {
  const router = useRouter()
  const email = router.query.email
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    let stale = false
    ;(async () => {
      // if (!stale) {
      //   resendEmail({ email: email as string })
      //     .then((res) => {})
      //     .catch((err: Error) => {})
      // }
    })()

    return () => {
      stale = true
    }
  }, [email])
  return (
    <FormWrap
      title='Verify your email'
      typoTitleProps={{
        textAlign: 'center',
      }}
    >
      {error && (
        <Alert severity='error'>
          <Typography variant='body2' fontWeight={500}>
            {error}
          </Typography>
        </Alert>
      )}
      <Stack spacing={'24px'}>
        <Box>
          <Typography
            variant='body1'
            sx={{
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            Please check your email for a verification link.
          </Typography>
          <Typography
            variant='body1'
            sx={{
              textAlign: { xs: 'center', md: 'center' },
            }}
          >
            Click on the link to complete the email verification process and
            activate your W3IPFS account.
          </Typography>
        </Box>

        <Link href={AppRouter.LOGIN} passHref>
          <ButtonCustomized
            variant='contained'
            color='secondary'
            fullWidth
            size='large'
            sx={{
              fontWeight: 500,
            }}
          >
            Back to Login
          </ButtonCustomized>
        </Link>
      </Stack>
    </FormWrap>
  )
}

export default ResendMailContent
