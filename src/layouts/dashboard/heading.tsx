import {
  SvgIconAnimateColor,
  TypographyColorAnimate,
} from '@/components/atoms/typography-led'
import { DEFAULT_TYPOGRAPHY_ARRAY_COLOR } from '@/constants'
import { Icons } from '@/themes/_icons'
import { Paper, Stack } from '@mui/material'

const DashboardLayoutHeading = () => {
  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.paper,
        maxHeight: { xs: 'auto', md: '157px' },
        height: { xs: 'auto', md: '157px' },
        overflow: 'hidden',
      }}
    >
      <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
        <TypographyColorAnimate
          arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
          startColor={0}
          variant='h1'
          fontWeight={'bold'}
          textAlign={'center'}
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '50px', md: '180px' },
            lineHeight: { xs: '50px', md: '125px' },
            letterSpacing: { xs: '4px', md: 0 },
            color: (theme) => theme.palette.primary.main,
          }}
        >
          WEB3
        </TypographyColorAnimate>
        <SvgIconAnimateColor
          arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
          startColor={2}
          component={Icons.StarFoutPointsCircle}
          sx={{
            fontSize: { xs: '24px', md: '96px' },
          }}
        ></SvgIconAnimateColor>
        <TypographyColorAnimate
          arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
          startColor={4}
          variant='h1'
          fontWeight={'bold'}
          textAlign={'center'}
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '50px', md: '180px' },
            lineHeight: { xs: '50px', md: '125px' },
            letterSpacing: { xs: '4px', md: 0 },

            color: (theme) => theme.palette.primary.main,
          }}
        >
          IPFS
        </TypographyColorAnimate>
      </Stack>
    </Paper>
  )
}

export default DashboardLayoutHeading
