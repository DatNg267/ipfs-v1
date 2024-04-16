import { PinNftReponse } from '@/apis/nft/type'
import CopyClipboardText from '@/components/molecules/copy-text'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { NftsPageContext } from '../resources'
import Image from 'next/image'
import { Images } from '@/themes/_images'
import { ResultPinWrapper } from '@/components/atoms/result-pin-wrapper'
import ButtonCustomized from '@/components/atoms/button'
import Pipe from '@/components/organisms/pipe'
import PipeReverse from '@/components/organisms/pipe/reverse'

type Props = {
  response: PinNftReponse
  handleClose: () => void
}
const AIOZ_IPFS_PUBLIC_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

const StepResult = ({ response, handleClose }: Props) => {
  return (
    <Stack
      sx={{ height: '100%', width: '100%', position: 'relative' }}
      flex={1}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '3%',
          left: '0%',
          zIndex: 0,
        }}
      >
        <PipeReverse></PipeReverse>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '0%',
          zIndex: 0,
        }}
      >
        <Pipe></Pipe>
      </Box>
      <Stack flex={1} justifyContent={'center'} sx={{ zIndex: 2 }} spacing={2}>
        <Stack sx={{ backgroundColor: 'background.paper' }} spacing={2}>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={response.data.metadata_cid}
              showText='CONTENT IDENTIFIER (CID)'
              typoProps={{
                variant: 'subtitle2',
                fontWeight: 'bold',
              }}
            />
            <Typography
              variant='body1'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {response.data.metadata_cid}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={`ipfs://${response.data.metadata_cid}`}
              showText='IPFS URL'
              typoProps={{
                variant: 'subtitle2',
                fontWeight: 'bold',
              }}
            />
            <Typography
              variant='body1'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              ipfs://{response.data.metadata_cid}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={`${AIOZ_IPFS_PUBLIC_GATEWAY}${response.data.metadata_cid}`}
              showText='GATEWAYS URL'
              typoProps={{
                variant: 'subtitle2',
                fontWeight: 'bold',
              }}
            />
            <a
              href={`${AIOZ_IPFS_PUBLIC_GATEWAY}${response.data.metadata_cid}`}
              target='_blank'
            >
              <Typography
                variant='body1'
                sx={{
                  textDecoration: 'underline',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {response.data.metadata_cid}
              </Typography>
            </a>
          </ResultPinWrapper>
        </Stack>
        <Stack alignItems={'center'}>
          <ButtonCustomized
            sx={{
              width: { xs: '100%', md: '394px' },
            }}
            variant='contained'
            color='secondary'
            size='large'
            onClick={handleClose}
          >
            Mange NFTs
          </ButtonCustomized>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default StepResult
