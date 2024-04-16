import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { breakpoints } from '@/themes/_theme'
import { fixedNumber, formatEther } from '@/utils/tools'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetBalance } from '../resources/hooks'
import BalanceLayer from './layer'

type Props = {}
const BillingPanel = (props: Props) => {
  const handleOpenModal = useOpenModal(ApplicationModal.TOP_UP)
  const [balance, setBalance] = useState<string | null>(null)
  const handleGetBalance = useGetBalance()
  useEffect(() => {
    let stale = false
    handleGetBalance({})
      .then((res) => {
        if (!stale) {
          setBalance(res.data.balance)
        }
      })
      .catch((err) => {})
    return () => {
      stale = true
    }
  }, [])
  return (
    <Paper
      sx={{
        backgroundColor: 'black',
        display: 'flex',
        margin: 0,
        flex: 1,
        position: 'relative',
        minHeight: { xs: '364px', md: 'unset' },
      }}
    >
      <BalanceLayer />
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          left: 28,
          right: 28,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        <Stack
          flex={1}
          justifyContent={'center'}
          alignItems={'flex-start'}
          spacing={{ xs: 4, md: '28px' }}
          sx={{
            [breakpoints.down('md')]: {
              alignItems: 'center',
            },
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <SvgIconCustomized
              component={Icons.Database}
              sx={{
                color: 'primary.main',
                fontSize: '20px',
              }}
            ></SvgIconCustomized>
            <Typography color='primary' variant='body1'>
              Prepaid Balance
            </Typography>
          </Stack>
          <Typography color='primary' variant='h3' fontWeight={'bold'}>
            $
            {balance === null || balance === '0'
              ? '0'
              : fixedNumber(formatEther(balance), 2)}
          </Typography>
          <ButtonCustomized
            variant='contained'
            size='large'
            onClick={handleOpenModal}
            sx={{
              padding: { xs: '8px 16px', md: '8px 32px' },
            }}
          >
            Top Up
          </ButtonCustomized>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default BillingPanel
