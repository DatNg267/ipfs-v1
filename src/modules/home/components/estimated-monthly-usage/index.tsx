import { useProgressBar } from '@/components/atoms/progress-bar'
import ProgressBarV2 from '@/components/atoms/progress-bar/v2'
import { AppRouter, PAY_DATA } from '@/constants'
import { Stack, Typography, Paper, Button, Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { AuthorizeStatus } from '@/redux/auth/reducer'
import { useRouter } from 'next/router'
import InputRangeCustomized from '@/components/atoms/progress-bar/v3'
import EstimatedInfo from './estimated-info'
import ButtonCustomized from '@/components/atoms/button'
import EstimateMonthlyUsageLayer from './layer'
import Link from 'next/link'

type Props = {}

const EstimatedMonthlyUsage = (props: Props) => {
  const textTotalRef = useRef<null | any>(null)
  const storageInputRef = useRef<null | any>(null)
  const bandwidthInputRef = useRef<null | any>(null)

  const storagePriceRef = useRef<any | null>(null)
  const bandwidthPriceRef = useRef<any | null>(null)

  const router = useRouter()

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
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 8 }}>
        <Stack
          spacing={{ xs: 4, md: 8 }}
          sx={{
            flex: 1,
          }}
        >
          <Typography color='text.primary' variant='h5' fontWeight={'bold'}>
            ESTIMATED MONTHLY USAGE
          </Typography>
          <Stack spacing={{ xs: 0, md: 8 }}>
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

          <Stack spacing={{ xs: 0, md: 8 }}>
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
        </Stack>
        <Paper
          sx={{
            position: 'relative',
            width: { xs: 'auto', md: '620px' },
            minWidth: { xs: 'auto', md: '620px' },
            maxWidth: { xs: 'auto', md: '620px' },
            height: '436px',
            minheight: '436px',
            maxheight: '436px',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          {/* Layer */}
          <EstimateMonthlyUsageLayer />
          {/* Content */}
          <Stack
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: 4,
            }}
          >
            <Stack spacing={4} flex={1}>
              <Typography
                color='primary'
                variant='h3'
                fontWeight={'bold'}
                letterSpacing={'0.04em'}
              >
                PAY AS YOU GO
              </Typography>
              <Box>
                <Typography color='primary' variant='body2'>
                  Pricing with transparent and scalable pricing.
                </Typography>
                <Typography color='primary' variant='body2'>
                  No commitments.{' '}
                </Typography>
                <Typography color='primary' variant='body2'>
                  No hidden fees.
                </Typography>
              </Box>
              <Typography
                color='primary'
                variant='h2'
                fontWeight={'bold'}
                letterSpacing={'0.04em'}
                ref={textTotalRef}
              >
                22$
              </Typography>
              <Typography color='primary' variant='body2'>
                Estimated total
              </Typography>
            </Stack>
            <Stack alignItems={{ xs: 'unset', md: 'center' }}>
              <Link href={AppRouter.PAYMENT_TAB_TOP_UP} passHref>
                <ButtonCustomized
                  size='large'
                  variant='contained'
                  color='primary'
                  sx={{
                    width: { xs: '100%', md: '187px' },
                  }}
                >
                  Payment
                </ButtonCustomized>
              </Link>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}

export default EstimatedMonthlyUsage
