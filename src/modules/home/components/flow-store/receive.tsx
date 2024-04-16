import React from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import { ContentWrap } from './styles'
type Props = {}

const Receive = (props: Props) => {
  return (
    <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-end' }}>
      <Typography
        variant='h4'
        fontWeight={'bold'}
        textAlign={{ xs: 'center', md: 'right' }}
      >
        Receive - Distribute IPFS <br></br> Files with Built-In CDN <br></br>in
        AIOZ Network
      </Typography>
      <ContentWrap
        sx={{
          ml: { xs: '0px', md: '200px !important' },
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '545px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: 'break-word',
          }}
        >
          <b>- Smart Routing/Caching:</b>
          {` Considering geolocation and user demand, your files are automatically replicated to multiple nearby nodes in order to scale effectively with your business growth.`}
        </Typography>
      </ContentWrap>
      <ContentWrap
        sx={{
          ml: { xs: '0px', md: '100px !important' },
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '645px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: 'break-word',
          }}
        >
          <b>- Dedicated Gateway:</b>
          {` Your files are served under ideal conditions, ensuring uninterrupted access regardless of traffic congestion. Stay in the fast lane and experience seamless file retrieval, providing your users with a smooth and reliable browsing experience.`}
        </Typography>
      </ContentWrap>
      <ContentWrap
        sx={{
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '745px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: 'break-word',
          }}
        >
          <b>- Built-in CDN:</b>

          {` Enjoy the benefits of a built-in Content Delivery Network (CDN) seamlessly integrated into AIOZ Network. This powerful feature optimizes the delivery of your files across the globe, reducing latency and ensuring uninterrupted access for your users, even during peak usage periods`}
        </Typography>
      </ContentWrap>
    </Stack>
  )
}

export default Receive
