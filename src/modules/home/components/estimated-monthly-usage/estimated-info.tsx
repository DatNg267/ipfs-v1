import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { Box, Stack, Typography } from '@mui/material'
import { forwardRef } from 'react'
type Props = {
  price: number
  title: string
  subtitle: string
  defaultValue: number
}

// eslint-disable-next-line react/display-name
const EstimatedInfo = forwardRef<any, any>(
  ({ price, title, subtitle, defaultValue }: Props, ref) => {
    return (
      <Stack
        direction={{ xs: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={{ xs: 2, md: 0 }}
      >
        <Box>
          <Typography
            color='text.primary'
            variant='subtitle2'
            fontWeight={'bold'}
          >
            {title}
          </Typography>
          <Typography color='text.primary' variant='subtitle2'>
            {subtitle}
          </Typography>
        </Box>
        <Stack
          direction='row'
          alignItems={'center'}
          sx={{
            border: '1px solid black',
            px: { xs: '8px', md: '0px' },
            borderRadius: { xs: '99px', md: APP_BORDER_RADIUS_PRIMARY },
          }}
        >
          <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'flex-end'}
            sx={{
              width: { xs: 'fit-content', md: 'fit-content' },
              minWidth: { xs: '80px', md: '145px' },
            }}
          >
            <Typography
              color='text.primary'
              variant='h4'
              fontWeight={'bold'}
              ref={ref}
            >
              {defaultValue}$
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    )
  }
)

export default EstimatedInfo
