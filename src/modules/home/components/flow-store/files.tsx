import { Images, ImagesHomePage } from '@/themes/_images'
import { breakpoints } from '@/themes/_theme'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'

type Props = {}

const Files = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        position: 'relative',
        [breakpoints.down('md')]: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '16.5%',
          right: 58,
          bottom: 0,
          [breakpoints.down('md')]: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            right: 0,
            left: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            [breakpoints.down('md')]: {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <Image
            width={isMobile ? 150 : 286}
            height={isMobile ? 150 : 286}
            src={ImagesHomePage.Files}
            alt='AIOZ-IPFS-FILES'
            priority={true}
          ></Image>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 208,
            left: 0,
            [breakpoints.down('md')]: {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              top: '-12px',
              transform: 'rotate(-37deg)',
              ml: '46px',
            },
          }}
        >
          <Image
            width={isMobile ? 150 : 341}
            height={isMobile ? 100 : 226}
            src={ImagesHomePage.Plane1}
            alt='AIOZ-IPFS-FILES'
            priority={true}
          ></Image>
        </Box>
      </Box>
    </Box>
  )
}

export default Files
