import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Container, Paper, Stack, Typography } from '@mui/material'

type Props = {
  color: string
}

const BillingHeading = ({ color }: Props) => {
  return (
    <Paper
      sx={{
        backgroundColor: color,
        px: '28px',
      }}
    >
      <Container maxWidth='xl'>
        <Stack direction='row' justifyContent={'space-between'}>
          <Stack direction={'row'} alignItems={'center'} spacing={8}>
            <Typography
              fontFamily={APP_FONT_FAMILY.ARRAY}
              fontWeight={'medium'}
              sx={{
                fontSize: { xs: '26px', md: '60px !important' },
                lineHeight: { xs: '34px', md: '64px !important' },
              }}
            >
              Payment
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}

export default BillingHeading
