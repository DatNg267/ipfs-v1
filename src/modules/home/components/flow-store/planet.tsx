import {
  Box,
  Stack,
  Typography,
  keyframes,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { Images, ImagesHomePage } from '@/themes/_images'
import { breakpoints } from '@/themes/_theme'
import TypographyIPFS from '@/components/atoms/typography-ipfs'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { colorTheme } from '@/themes/_color'

type Props = {}
const colorToggle = {
  '100%': {
    color: colorTheme.general.yellow[700],
  },
  '91%': {
    color: colorTheme.general.yellow[400],
  },
  '84%': {
    color: colorTheme.general.dotMint[300],
  },
  '77%': {
    color: colorTheme.general.dotMint[400],
  },
  '70%': {
    color: colorTheme.general.dotMint[700],
  },
  '63%': {
    color: colorTheme.general.dotOrange[400],
  },
  '56%': {
    color: colorTheme.general.dotOrange[700],
  },
  '49%': {
    color: colorTheme.general.dotCoban[400],
  },
  '42%': {
    color: colorTheme.general.dotCoban[700],
  },

  '35%': {
    color: colorTheme.general.dotPurple[400],
  },

  '28%': {
    color: colorTheme.general.dotPurple[700],
  },
  '21%': {
    color: colorTheme.general.dotPink[400],
  },
  '14%': {
    color: colorTheme.general.dotPink[700],
  },
  '7%': {
    color: colorTheme.general.dotYellow[400],
  },
  '0%': {
    color: colorTheme.general.dotYellow[700],
  },
}
const PlanetAnimate = keyframes`
 ${colorToggle}
`
const Planet = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '274px', md: '573px' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 10,
          width: 'fit-content',
          animation: 'animate-rotate linear 30s infinite',
        }}
      >
        <SvgIconCustomized
          viewBox='0 0 573 406'
          component={Icons.Planet}
          sx={{
            fontSize: { xs: '240px', md: '573px' },
            animation: `${PlanetAnimate}  linear 30s infinite reverse`,
          }}
        />
      </Box>
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack
          sx={{ width: 'fit-content' }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant='h3'>WEB3</Typography>
          <Stack direction={'row'}>
            <TypographyIPFS fontWeight={'bold'} variant='h3'></TypographyIPFS>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Planet
