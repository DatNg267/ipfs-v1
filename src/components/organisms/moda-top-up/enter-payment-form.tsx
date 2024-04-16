import ProgressBarCustomized, {
  useProgressBar,
} from '@/components/atoms/progress-bar'
import { PAY_DATA } from '@/constants'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import PayEstimated from './estimated'
import { TopUpStep } from './types'

import TopUpModalHeading from './heading'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { useEffect, useRef } from 'react'
import InputRangeCustomized from '@/components/atoms/progress-bar/v3'
import EstimatedInfo from '@/modules/home/components/estimated-monthly-usage/estimated-info'
import ButtonCustomized from '@/components/atoms/button'

type Props = {
  handleNextStep: (step: TopUpStep) => void
  handleChangePrice: (price: number) => void
}

function EnterPaymentForm({ handleNextStep, handleChangePrice }: Props) {
  const textTotalRef = useRef<null | any>(null)
  const storageInputRef = useRef<null | any>(null)
  const bandwidthInputRef = useRef<null | any>(null)

  const storagePriceRef = useRef<any | null>(null)
  const bandwidthPriceRef = useRef<any | null>(null)

  useEffect(() => {
    const inputBandwidth = document.querySelector(
      `#${PAY_DATA.DeliveryBandwidth.id}`
    ) as HTMLElement
    const inputStorage = document.querySelector(
      `#${PAY_DATA.Storage.id}`
    ) as HTMLElement
    if (!inputStorage) return
    // STORAGE
    const bandwidthMutation = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'value'
        ) {
          const value = (mutation.target as any).value
          bandwidthPriceRef.current.innerHTML = `${
            Math.round((value * PAY_DATA.DeliveryBandwidth.maxMonth) / 100) *
            PAY_DATA.DeliveryBandwidth.pricePerMonth
          }$`
          textTotalRef.current.innerHTML = `${
            Math.round((value * PAY_DATA.DeliveryBandwidth.maxMonth) / 100) *
              PAY_DATA.DeliveryBandwidth.pricePerMonth +
            Math.round(
              (storageInputRef.current.value * PAY_DATA.Storage.maxMonth) / 100
            ) *
              PAY_DATA.Storage.pricePerMonth
          }$`
        }
      }
    })
    bandwidthMutation.observe(inputBandwidth, { attributes: true })

    const storageMutation = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'value'
        ) {
          const value = (mutation.target as any).value
          storagePriceRef.current.innerHTML = `${
            Math.round((value * PAY_DATA.Storage.maxMonth) / 100) *
            PAY_DATA.Storage.pricePerMonth
          }$`
          textTotalRef.current.innerHTML = `${
            Math.round((value * PAY_DATA.Storage.maxMonth) / 100) *
              PAY_DATA.Storage.pricePerMonth +
            Math.round(
              (bandwidthInputRef.current.value *
                PAY_DATA.DeliveryBandwidth.maxMonth) /
                100
            ) *
              PAY_DATA.DeliveryBandwidth.pricePerMonth
          }$`
        }
      }
    })
    storageMutation.observe(inputStorage, { attributes: true })
  }, [])
  return (
    <>
      <TopUpModalHeading title={'Top Up Balance'} />
      <Paper
        sx={{
          p: 4,
          px: '32px',
        }}
      >
        <Stack
          spacing={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant='body1' fontWeight={700}>
            TOP UP AMOUNT:
          </Typography>
          <Box
            sx={{
              backgroundColor: 'background.default',
              px: { xs: 2, md: '16px' },
              py: { xs: 0, md: 1 },
              borderRadius: APP_BORDER_RADIUS_PRIMARY,
              minWidth: { xs: '98px', md: '147px' },
            }}
          >
            <Typography
              variant='h4'
              color='primary'
              textAlign={'right'}
              ref={textTotalRef}
            >
              {22}$
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: 4,
          px: '32px',
        }}
      >
        <Stack
          spacing={{ xs: 2, md: 8 }}
          sx={{
            flex: 1,
          }}
        >
          <Typography variant='body1' fontWeight={700}>
            ESTIMATED MONTHLY USAGE
          </Typography>
          {/* Estimate Storage */}

          <Stack>
            <EstimatedInfo
              ref={storagePriceRef}
              title={PAY_DATA.Storage.title}
              subtitle={PAY_DATA.Storage.subTitle}
              defaultValue={
                PAY_DATA.Storage.defaultValue * PAY_DATA.Storage.pricePerMonth
              }
            />
            <InputRangeCustomized
              ref={storageInputRef}
              id={PAY_DATA.Storage.id}
              defaultValue={Math.round(
                (PAY_DATA.Storage.defaultValue / PAY_DATA.Storage.maxMonth) *
                  100
              )}
              max={PAY_DATA.Storage.maxMonth}
            />
          </Stack>
          {/* Estimate Bandwidth */}

          <Stack>
            <EstimatedInfo
              ref={bandwidthPriceRef}
              title={PAY_DATA.DeliveryBandwidth.title}
              subtitle={PAY_DATA.DeliveryBandwidth.subTitle}
              defaultValue={
                PAY_DATA.DeliveryBandwidth.defaultValue *
                PAY_DATA.DeliveryBandwidth.pricePerMonth
              }
            />
            <InputRangeCustomized
              ref={bandwidthInputRef}
              id={PAY_DATA.DeliveryBandwidth.id}
              defaultValue={Math.round(
                (PAY_DATA.DeliveryBandwidth.defaultValue /
                  PAY_DATA.DeliveryBandwidth.maxMonth) *
                  100
              )}
              max={PAY_DATA.DeliveryBandwidth.maxMonth}
            />
          </Stack>

          {/* <Box>
            <Typography variant='body2'>
              <b>Estimate:</b> Your top up balance will be used in 0.95 months
            </Typography>
            <Typography variant='body2'>
              You need to top up at 20/5/2023
            </Typography>
          </Box> */}

          <ButtonCustomized
            variant='contained'
            color='secondary'
            size='large'
            fullWidth
            onClick={() => {
              if (textTotalRef.current) {
                const totalElement = textTotalRef.current as HTMLDivElement
                handleChangePrice(parseInt(totalElement.innerHTML))
              }

              handleNextStep('payment-method')
            }}
          >
            Confirm to payment
          </ButtonCustomized>
        </Stack>
      </Paper>
    </>
  )
}

export default EnterPaymentForm
