import { colorTheme } from '@/themes/_color'
import { Images, ImagesPaymentPage } from '@/themes/_images'
import { IconButton, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import TopUpModalHeading from './heading'
import { TopUpStep } from './types'
import PaymentMethodHeading from './heading-payment-method'

type Props = {
  handleChangeStep: (step: TopUpStep) => void
}

const PaymentMethod = ({ handleChangeStep }: Props) => {
  return (
    <>
      <PaymentMethodHeading
        handleChangeStep={handleChangeStep}
        title={'Payment Method'}
      />
      <Stack>
        <IconButton
          onClick={() => handleChangeStep('pay-with-aioz')}
          sx={{
            p: 0,

            '&:hover': {
              '& .MuiPaper-root': {
                backgroundColor: colorTheme.light.primary[600],
              },
            },
          }}
          disableRipple
        >
          <Paper
            sx={{
              height: { xs: '200px', md: '308px' },
              display: 'flex',
              flex: 1,
            }}
          >
            <Stack
              flex={1}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={4}
            >
              <Image
                alt='aioz-method'
                src={ImagesPaymentPage.AiozLogoMethod}
                width={60}
                height={47}
              />
              <Typography variant='subtitle2'>Pay With $AIOZ Native</Typography>
            </Stack>
          </Paper>
        </IconButton>
        <IconButton
          onClick={() => handleChangeStep('pay-with-card')}
          sx={{
            p: 0,

            '&:hover': {
              '& .MuiPaper-root': {
                backgroundColor: colorTheme.light.primary[600],
              },
            },
          }}
          disableRipple
        >
          <Paper
            sx={{
              height: { xs: '200px', md: '308px' },
              display: 'flex',
              flex: 1,
            }}
          >
            <Stack
              flex={1}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={4}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={4}
              >
                <Image
                  alt='aioz-visa-method'
                  src={ImagesPaymentPage.Visa}
                  width={60}
                  height={47}
                />
                <Image
                  alt='aioz-mastercard-method'
                  src={ImagesPaymentPage.MasterCard}
                  width={60}
                  height={47}
                />
                <Image
                  alt='aioz-discover-method'
                  src={ImagesPaymentPage.Discover}
                  width={60}
                  height={47}
                />
                <Image
                  alt='aioz-american-express-method'
                  src={ImagesPaymentPage.AmericanExpress}
                  width={60}
                  height={47}
                />
              </Stack>
              <Typography variant='subtitle2'>Pay With Credit Card</Typography>
            </Stack>
          </Paper>
        </IconButton>
      </Stack>
    </>
  )
}

export default PaymentMethod
