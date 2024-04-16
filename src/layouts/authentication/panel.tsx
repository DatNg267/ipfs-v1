import { TypographyColorAnimate } from '@/components/atoms/typography-led'
import { DEFAULT_TYPOGRAPHY_ARRAY_COLOR } from '@/constants'
import { fontSize } from '@/themes/font'
import { Box, Paper, Stack, Typography } from '@mui/material'

const AuthenticationLayoutPanel = () => {
  return (
    <Paper
      sx={{
        overflow: 'hidden',
        margin: 0,
        p: 0,
        height: '100%',
        backgroundColor: (theme) => theme.palette.background.default,
        py: 16,
      }}
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ height: '100%' }}
      >
        <Box>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={0}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              lineHeight: '68%',
              color: (theme) => theme.palette.dotPink[500],
            }}
          >
            SAY
          </TypographyColorAnimate>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={1}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              ...fontSize[160],
              lineHeight: '68%',
              color: (theme) => theme.palette.dotBlue[500],
            }}
          >
            HELLO
          </TypographyColorAnimate>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={2}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              lineHeight: '68%',
              color: (theme) => theme.palette.primary.main,
            }}
          >
            TO THE
          </TypographyColorAnimate>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={3}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              ...fontSize[160],
              lineHeight: '68%',
              color: (theme) => theme.palette.dotYellow[500],
            }}
          >
            DATA
          </TypographyColorAnimate>
          <TypographyColorAnimate
            arrColor={DEFAULT_TYPOGRAPHY_ARRAY_COLOR}
            startColor={4}
            variant='h1'
            fontWeight={'bold'}
            textAlign={'center'}
            sx={{
              ...fontSize[160],
              lineHeight: '68%',
              color: (theme) => theme.palette.dotMint[500],
            }}
          >
            LAYER
          </TypographyColorAnimate>
        </Box>
        <Typography
          variant='body2'
          textAlign={'center'}
          sx={{
            mt: 8,
            width: '494px',
            fontWeight: 400,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Empowering Web3 dApps with the Ultimate Storage Solution: AIOZ Web3
          IPFS. Secure, Immutable, and Ready for Game-Changing Experiences in
          Gaming, Art, Collectibles, and Beyond.
        </Typography>
      </Stack>
    </Paper>
  )
}

export default AuthenticationLayoutPanel
