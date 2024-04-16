import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { ContentWrap } from './styles'

type Props = {}

const Store = (props: Props) => {
  return (
    <Stack
      spacing={4}
      sx={{
        overflow: { xs: 'hidden', md: 'hidden' },
      }}
    >
      <ContentWrap
        sx={{
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '777px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: { xs: 'break-word', md: 'break-word' },
          }}
        >
          <b>- IPFS Content Addressing:</b>
          {` With IPFS, files are identified and located using unique Content Identifiers (CIDs). CIDs are generated based on the content of the file itself, ensuring the integrity and immutability of your data`}
        </Typography>
      </ContentWrap>
      <ContentWrap
        sx={{
          mr: { xs: '0px', md: '100px !important' },
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '777px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: { xs: 'break-word', md: 'unset' },
          }}
        >
          <b>- Distributed File System:</b>
          {` IPFS employs a distributed file system, breaking down files into smaller chunks. These chunks are stored and replicated across multiple nodes in the network.`}
        </Typography>
      </ContentWrap>
      <ContentWrap
        sx={{
          mr: { xs: '0px', md: '200px !important' },
          width: { xs: 'auto', md: 'auto' },
          maxWidth: { xs: 'auto', md: '777px' },
        }}
      >
        <Typography
          variant='body1'
          letterSpacing={'-0.01em'}
          sx={{
            wordWrap: { xs: 'break-word', md: 'unset' },
          }}
        >
          <b>- Encryption & Replication by AIOZ Network:</b>

          {` AIOZ Network enhances the security and durability of your stored files through encryption and replication across multiple nodes in diverse locations`}
        </Typography>
      </ContentWrap>
    </Stack>
  )
}

export default Store
