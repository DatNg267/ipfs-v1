import { RegisterResponse } from '@/apis/auth/type'
import ButtonCustomized from '@/components/atoms/button'
import FormHeading from '@/components/molecules/form-heading'
import { AppRouter } from '@/constants'
import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {
  email: string
}

const NofityCheckEmail = ({ email }: Props) => {
  return (
    <Stack spacing={8}>
      <FormHeading title='Verify email' />
      <Box>
        <Typography variant='body2'>
          Please check your inbox for the verification code sent to
        </Typography>
        <Typography variant='body2' fontWeight={600}>
          {email}
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
  )
}

export default NofityCheckEmail
