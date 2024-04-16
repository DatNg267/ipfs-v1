import WrapperPopup from '@/components/molecules/wrapper-popup'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PayWithAioz from './pay-with-aioz'
import PayWithCreditCard from './pay-with-credit'
import PaymentMethod from './payment-method'
import { TopUpStep } from './types'
import EnterPaymentForm from './enter-payment-form'

const formSchema = yup.object({
  cid: yup.string().required(),
  name: yup.string().required(),
})

const TopUpModal = () => {
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const [error, setError] = useState<string | null>(null)

  const [step, setStep] = useState<TopUpStep>('enter-payment')
  const [price, setPrice] = useState(0)

  const handleChangeStep = (newStep: TopUpStep) => setStep(newStep)
  const handleChangePrice = (newPrice: number) => setPrice(newPrice)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cid: '',
      name: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (openModal === ApplicationModal.TOP_UP) {
      setStep('enter-payment')
    }
  }, [openModal])
  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])

  return (
    <>
      <Modal
        onClose={handleCloseModal}
        open={openModal === ApplicationModal.TOP_UP}
      >
        <WrapperPopup>
          {step === 'enter-payment' && (
            <EnterPaymentForm
              handleChangePrice={handleChangePrice}
              handleNextStep={handleChangeStep}
            />
          )}
          <Box
            sx={{
              ...(step === 'payment-method'
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                    width: 0,
                    height: 0,
                    overflow: 'hidden',
                  }),
            }}
          >
            <PaymentMethod handleChangeStep={handleChangeStep} />
          </Box>

          {step === 'pay-with-aioz' && (
            <PayWithAioz price={price} handleChangeStep={handleChangeStep} />
          )}
          {step === 'pay-with-card' && (
            <PayWithCreditCard handleChangeStep={handleChangeStep} />
          )}
        </WrapperPopup>
      </Modal>
    </>
  )
}

export default TopUpModal
