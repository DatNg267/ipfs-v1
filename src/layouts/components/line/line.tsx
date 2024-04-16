import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { HEADER_LINE_HEIGHT, HEADER_LINE_HEIGHT_MOBILE } from '@/constants'
import { Icons } from '@/themes/_icons'
import { Box, Container, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const Line = () => {
  return (
    <Paper
      sx={{
        p: { xs: 0, md: 0 },
        height: { xs: HEADER_LINE_HEIGHT_MOBILE, md: HEADER_LINE_HEIGHT },
        minHeight: { xs: HEADER_LINE_HEIGHT_MOBILE, md: HEADER_LINE_HEIGHT },
        maxHeight: { xs: HEADER_LINE_HEIGHT_MOBILE, md: HEADER_LINE_HEIGHT },
        display: 'flex',
      }}
    >
      {/* <Container maxWidth='xl'> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <SvgIconCustomized component={Icons.Subtract} />
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'inherit',
                display: ['-webkit-box'],
                whiteSpace: 'nowrap',
              }}
            >
              Web3 IPFS File Storage
            </Typography>
            <SvgIconCustomized component={Icons.Subtract} />
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'inherit',
                display: ['-webkit-box'],
                whiteSpace: 'nowrap',
              }}
            >
              Ultimate One-Stop Shop for NFT Storage
            </Typography>
            <SvgIconCustomized component={Icons.Subtract} />
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'inherit',
                display: ['-webkit-box'],
                whiteSpace: 'nowrap',
              }}
            >
              Ultra fast delivery with Built-in CDN
            </Typography>
            <SvgIconCustomized component={Icons.Subtract} />
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'inherit',
                display: ['-webkit-box'],
                whiteSpace: 'nowrap',
              }}
            >
              Bandwidth Optimization with Smart Routing & Caching
            </Typography>
            <SvgIconCustomized component={Icons.Subtract} />
            <Typography
              variant='subtitle2'
              sx={{
                overflow: 'hidden',
                textOverflow: 'inherit',
                display: ['-webkit-box'],
                whiteSpace: 'nowrap',
              }}
            >
              Data Replication & Secured by AIOZ Network
            </Typography>
          </motion.div>
        ))}
      </Box>
      {/* </Container> */}
    </Paper>
  )
}

export default Line
