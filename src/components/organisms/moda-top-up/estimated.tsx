import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { Box, Stack, Typography } from '@mui/material'
type Props = {
  title: string
  subtitle: string
  price: number
}

const PayEstimated = ({ title, subtitle, price }: Props) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Typography color='text.primary' variant='body1' fontWeight={'bold'}>
          {title}
        </Typography>
        <Typography color='text.primary' variant='body1'>
          {subtitle}
        </Typography>
      </Box>

      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{
          border: '1px solid black',
          px: '16px',
          py: '0px',
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          minWidth: '147px',
        }}
      >
        <Typography color='text.primary' variant='h4' fontWeight={'bold'}>
          {price}$
        </Typography>
      </Stack>
    </Stack>
  )
}

export default PayEstimated
