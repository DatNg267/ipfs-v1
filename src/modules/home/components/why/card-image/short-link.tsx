import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { ImagesHomePage } from '@/themes/_images'
import { Box, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ShortLinkIcon = () => {
  return (
    <Box
      sx={{
        width: '200px',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          width: '309px',
        }}
        initial={{ x: 0 }}
        animate={{ x: '-628px' }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Stack direction='row'>
          <Image
            loading={'lazy'}
            alt={`aioz`}
            src={ImagesHomePage.WhyOption7}
            width={635}
            height={49}
          />
          <Image
            loading={'lazy'}
            alt={`aioz`}
            src={ImagesHomePage.WhyOption7}
            width={635}
            height={49}
          />
        </Stack>
      </motion.div>
    </Box>
  )
}

export default ShortLinkIcon
