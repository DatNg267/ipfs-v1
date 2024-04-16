import ButtonCustomized from '@/components/atoms/button'
import { ResultPinWrapper } from '@/components/atoms/result-pin-wrapper'
import CopyClipboardText from '@/components/molecules/copy-text'
import { AppRouter } from '@/constants'
import { Stack, Typography, Button, Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type Props = {
  cid: string
  handleClose: () => void
}
const AIOZ_IPFS_PUBLIC_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY
const StepDemoStoreResult = ({ cid, handleClose }: Props) => {
  return (
    <Stack
      sx={{
        height: '100%',
      }}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={4}
    >
      <Stack
        sx={{
          backgroundColor: 'transparent',
          width: '100%',
        }}
        spacing={2}
      >
        <ResultPinWrapper
          sx={{
            width: '100%',
            backgroundColor: 'background.paper',
            px: 4,
            py: 4,
            borderRadius: 4,
          }}
        >
          <CopyClipboardText
            copyText={cid}
            showText='CONTENT IDENTIFIER (CID)'
            typoProps={{
              variant: 'body1',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {cid}
          </Typography>
        </ResultPinWrapper>
        <ResultPinWrapper
          sx={{
            width: '100%',
            backgroundColor: 'background.paper',
            px: 4,
            py: 4,
            borderRadius: 4,
          }}
        >
          <CopyClipboardText
            copyText={`ipfs://${cid}`}
            showText='IPFS URL'
            typoProps={{
              variant: 'body1',
              fontWeight: 'bold',
            }}
          />
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            ipfs://{cid}
          </Typography>
        </ResultPinWrapper>
        <ResultPinWrapper
          sx={{
            width: '100%',
            backgroundColor: 'background.paper',
            px: 4,
            py: 4,
            borderRadius: 4,
          }}
        >
          <CopyClipboardText
            copyText={`${AIOZ_IPFS_PUBLIC_GATEWAY}${cid}`}
            showText='GATEWAYS URL'
            typoProps={{
              variant: 'body1',
              fontWeight: 'bold',
            }}
          />
          <a href={`${AIOZ_IPFS_PUBLIC_GATEWAY}${cid}`} target='_blank'>
            <Typography
              variant='body2'
              sx={{
                textDecoration: 'underline',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {cid}
            </Typography>
          </a>
        </ResultPinWrapper>
      </Stack>
      <Stack direction={'row'} sx={{ width: '100%' }} spacing={4}>
        <ButtonCustomized
          sx={{
            width: '30 0px',
            px: '4px',
            flex: 1,
          }}
          fullWidth
          variant='outlined'
          color='secondary'
          size='large'
          onClick={handleClose}
        >
          Upload another
        </ButtonCustomized>
        <Link href={AppRouter.IPFS_FILES} passHref style={{ flex: 1 }}>
          <ButtonCustomized
            sx={{
              width: '30 0px',
              px: '4px',
            }}
            fullWidth
            variant='contained'
            color='secondary'
            size='large'
          >
            Explore now
          </ButtonCustomized>
        </Link>
      </Stack>
    </Stack>
  )
}

export default StepDemoStoreResult
