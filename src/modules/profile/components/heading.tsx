import { usePageColor } from '@/hooks/usePageColor'
import { APP_FONT_FAMILY } from '@/themes/_theme'
import { Container, Paper, Stack, Typography } from '@mui/material'

const ProfileHeading = () => {
  const getColor = usePageColor()
  const color = getColor()
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
              sx={{
                fontSize: { md: '60px', xs: '26px' },
                lineHeight: { md: '72px', xs: '34px' },
              }}
              fontWeight={'medium'}
            >
              Profile
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}

export default ProfileHeading
