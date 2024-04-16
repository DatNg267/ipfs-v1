import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { Stack, keyframes } from '@mui/material'
import React from 'react'

type Props = {}
const keyframs = keyframes`
 0% {
  transform: translateX(0);
  }
  70% {
  transform: translateX(-80px);
  }
  90% {
  transform: translateX(0px); 
}
  100% {
  transform: translateX(0px);
}
`

const keyframsVibrant = keyframes`
 0% {
  transform: translateX(0);
  }
  80% {
    transform: translateX(0);
  }
  90% {
  transform: translateX(0.5px); 
}
  92% {
  transform: translateX(-0.5px); 
}
95% {
  transform: translateX(0.5px); 
}
97% {
  transform: translateX(-0.5px); 
}
  100% {
  transform: translateX(0px);
}
`
const ThreeCircle = (props: Props) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      sx={{
        display: { xs: 'none', md: 'flex' },
        minWidth: '208px',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      }}
    >
      <SvgIconCustomized
        component={Icons.Ellipse}
        sx={{
          fontSize: '20px',
          ml: 8,
          animation: `${keyframs} 1.2s ease-in-out 0.5s infinite`,
        }}
      />
      <SvgIconCustomized
        component={Icons.Ellipse}
        sx={{
          fontSize: '20px',
          ml: 8,
          animation: `${keyframsVibrant} 1.2s ease-in-out 0.5s infinite`,
        }}
      />
      <SvgIconCustomized
        component={Icons.Ellipse}
        sx={{
          fontSize: '20px',
          ml: 8,
          animation: `${keyframsVibrant} 1.2s ease-in 0.5s infinite`,
        }}
      />
    </Stack>
  )
}

export default ThreeCircle
