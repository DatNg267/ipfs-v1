import IconButtonCustomized from '@/components/atoms/icon-button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Container, Paper, Stack, Typography } from '@mui/material'

type Props = {
  color: any
}

const ApiKeysHeading = ({ color }: Props) => {
  const handleOpenModal = useOpenModal(ApplicationModal.CREATE_API_KEY)
  return (
    <Paper
      sx={{
        backgroundColor: color,
        px: { xs: 2, md: '28px' },
        height: { xs: '48px', md: 'unset' },
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
              API KEYS
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <IconButtonCustomized
              variant='outlined'
              onClick={handleOpenModal}
              sx={{
                height: { xs: '32px', md: '44px' },
                width: { xs: '32px', md: '44px' },
              }}
            >
              <SvgIconCustomized
                component={Icons.Add}
                sx={{
                  fontSize: { xs: '16px', md: '24px' },
                }}
              ></SvgIconCustomized>
            </IconButtonCustomized>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}

export default ApiKeysHeading
