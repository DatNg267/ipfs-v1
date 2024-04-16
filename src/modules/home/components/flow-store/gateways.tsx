import { colorToggleKeyframes } from '@/themes/_animation'
import { HomeGatewaysIcons } from '@/themes/_icons'
import {
  Box,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
type Props = {}

const Gateways = (props: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        my: { xs: 1, md: '-32px' },
        height: '300px',
        position: 'relative',
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          height: '150px',
          width: { xs: '317px', md: '455px' },
          transform: 'translate(-50%, -50%)',
          zIndex: 9,
        }}
      >
        <SvgIcon
          component={HomeGatewaysIcons.StartLine}
          inheritViewBox
          sx={{
            color: '#FBFE66',
            fontSize: '224px',
            position: 'absolute',
            top: { xs: '-35%', md: '-90px' },
            left: { xs: '20%', md: '-140px' },
            height: '197px',
            transform: {
              xs: 'scale(0.6) rotate(60deg) translateX(-50%)',
              md: 'none',
            },
            zIndex: 1,
          }}
        />
        <SvgIcon
          component={HomeGatewaysIcons.EndLine}
          inheritViewBox
          sx={{
            color: '#FBFE66',
            fontSize: '248px',
            position: 'absolute',
            top: { xs: '3%', md: '30px' },
            left: { xs: '-2%', md: '50px' },
            zIndex: 21,
            transform: { xs: 'scale(0.6) rotate(65deg)', md: 'none' },
          }}
        />
        <SvgIcon
          component={HomeGatewaysIcons.Plane}
          inheritViewBox
          sx={{
            color: '#FBFE66',
            fontSize: '136px',
            position: 'absolute',
            top: { xs: '97%', md: '140px' },
            left: { xs: '22%', md: '245px' },
            zIndex: 22,
            transform: { xs: 'scale(0.6) rotate(40deg)', md: 'none' },
          }}
        />
        <SvgIcon
          component={HomeGatewaysIcons.ShapeGateways}
          viewBox='0 0 210 67'
          sx={{
            color: '#FBFE66',
            fontSize: { xs: '317px', md: '455px' },
            position: 'absolute',
            top: '0',
            left: '0',
            height: '150px',
            animation: `${colorToggleKeyframes} linear 8s infinite`,
            zIndex: 20,
          }}
        />
        <Typography
          variant='h4'
          fontWeight={'bold'}
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
          }}
          textAlign={'center'}
        >
          IPFS GATEWAYS
        </Typography>
      </Box>
    </Box>
  )
}

export default Gateways
