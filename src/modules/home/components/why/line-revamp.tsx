import { Box } from '@mui/material'

export const LineLeftBottom = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: '60%',
        bottom: 0,
        borderTopRightRadius: '99px',
        borderTopLeftRadius: '99px',
        width: '16px',
        background: '#000',
        display: { xs: 'none', md: 'block' },
      }}
    />
  )
}

export const LineRightBottom = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        top: '30%',
        bottom: 0,
        borderTopRightRadius: '99px',
        borderTopLeftRadius: '99px',
        width: '16px',
        background: '#000',
        display: { xs: 'none', md: 'block' },
      }}
    />
  )
}
export const LineTopRight = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        top: '0',
        bottom: '60%',
        width: '16px',
        borderBottomRightRadius: '99px',
        borderBottomLeftRadius: '99px',
        background: '#000',
        display: { xs: 'none', md: 'block' },
      }}
    />
  )
}

export const LineTopLeft = ({ percentHeight }: { percentHeight: number }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: '0',
        bottom: `${100 - percentHeight}%`,
        width: '16px',
        borderBottomRightRadius: '99px',
        borderBottomLeftRadius: '99px',
        background: '#000',
        display: { xs: 'none', md: 'block' },
      }}
    />
  )
}
