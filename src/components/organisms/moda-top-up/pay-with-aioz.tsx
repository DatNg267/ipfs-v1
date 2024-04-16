import { getToken } from '@/apis/token'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { NativeToken } from '@/types'
import { UserErrorMessage } from '@/utils/error'
import { fixedNumber } from '@/utils/tools'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, FormLabel, Paper, Stack, TextField } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import TopUpModalHeading from './heading'
import { TopUpStep } from './types'
import QRCode from 'react-qr-code'
import TransactionHistory from './transaction-history'
import { ScrollBarStyled, breakpoints } from '@/themes/_theme'
import ButtonCustomized from '@/components/atoms/button'

const formSchema = yup.object().shape({
  address: yup.string(),
})

type Props = {
  price: number
  handleChangeStep: (stepName: TopUpStep) => void
}

const PayWithAioz = ({ price, handleChangeStep }: Props) => {
  const handleCloseModal = useCloseModal()
  const user = useAppSelector((state) => state.auth.user)
  const [token, setToken] = useState<NativeToken | null>(null)

  useEffect(() => {
    let stale = false

    getToken()
      .then((res) => {
        if (!stale) setToken(res.data)
      })
      .catch((err) => {})

    return () => {
      stale = true
    }
  }, [])
  const amount = token?.current_price
    ? fixedNumber((price / token.current_price).toString(), 0)
    : '0'
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      address: '',
    },

    mode: 'onChange',
  })
  return (
    <>
      <TopUpModalHeading title={'Pay with $AIOZ'} />
      <Paper
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <Stack spacing={4}>
          <Stack alignItems={'center'}>
            <Box
              sx={{
                width: 'fit-content',
                height: 'fit-content',
                borderRadius: '4px',
                border: '2px solid',
                borderColor: 'divider.dark',
                padding: '6px',
                '& svg': {
                  display: 'block',
                },
              }}
            >
              {user && (
                <QRCode
                  value={user.wallet_address}
                  bgColor='transparent'
                  size={100}
                />
              )}
            </Box>
          </Stack>

          <Stack spacing={4}>
            <TextField
              contentEditable={false}
              variant='standard'
              label='Address'
              fullWidth
              value={
                user
                  ? user?.wallet_address
                  : UserErrorMessage.AN_ERROR_HAS_OCCURRED
              }
            ></TextField>
            <TextField
              variant='standard'
              label='Network:'
              fullWidth
              value={'AIOZ Network'}
            ></TextField>
          </Stack>
          <TextField
            variant='standard'
            label='Amount'
            fullWidth
            value={`$${price} ~ ${amount} AIOZ`}
          ></TextField>
          <Stack direction={'row'} alignItems={'center'} spacing={4}>
            <ButtonCustomized
              variant='outlined'
              color='secondary'
              fullWidth
              size='large'
              onClick={() => {
                handleChangeStep('payment-method')
              }}
            >
              Back
            </ButtonCustomized>
            <ButtonCustomized
              variant='contained'
              color='secondary'
              fullWidth
              size='large'
              onClick={handleCloseModal}
            >
              Close
            </ButtonCustomized>
          </Stack>
        </Stack>
      </Paper>
      <Paper
        sx={{
          p: {
            xs: 4,
            md: 4,
            ...ScrollBarStyled,
            overflow: 'auto',
            [breakpoints.down('md')]: {
              paddingRight: '4px',
            },
          },
        }}
      >
        <TransactionHistory />
      </Paper>
    </>
  )
}

export default PayWithAioz
