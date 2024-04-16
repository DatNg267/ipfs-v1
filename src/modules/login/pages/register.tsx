import { useState } from 'react'
import FormRegister from '../components/form-register'
import { RegisterStep } from '../types/register'
import NofityCheckEmail from '../components/notify-check-email'
import { Stack } from '@mui/material'
import { RegisterResponse } from '@/apis/auth/type'

const RegisterPageContent = () => {
  const [step, setStep] = useState<RegisterStep | null>('Fill Form')
  const [email, setEmail] = useState<string>('')

  const handleSetEmail = (response: string) => setEmail(response)
  const handleNextStep = () => setStep('Notify Check Email')
  return (
    <>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ height: '100%' }}
        spacing={8}
        // padding={{ xs: 0, md: 8 }}
      >
        {step === 'Fill Form' && (
          <FormRegister
            handleSetEmail={handleSetEmail}
            handleNextStep={handleNextStep}
          />
        )}
        {step === 'Notify Check Email' && <NofityCheckEmail email={email} />}
      </Stack>
    </>
  )
}
export default RegisterPageContent
