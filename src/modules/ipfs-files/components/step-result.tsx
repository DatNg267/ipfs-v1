import ButtonCustomized from '@/components/atoms/button'
import { ResultPinWrapper } from '@/components/atoms/result-pin-wrapper'
import CopyClipboardText from '@/components/molecules/copy-text'
import Pipe from '@/components/organisms/pipe'
import PipeReverse from '@/components/organisms/pipe/reverse'
import { Box, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { IpfsFilesPageContext } from '../resources'

type Props = {
  cid: string
}
const AIOZ_IPFS_PUBLIC_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

const IpfsFileUploadResult = ({ cid }: Props) => {
  const { handleCloseUploadFile } = useContext(IpfsFilesPageContext)

  return (
    <Stack sx={{ height: '100%', width: '100%', position: 'relative' }}>
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
      <Stack
        flex={1}
        justifyContent={'center'}
        sx={{ zIndex: 2 }}
        spacing={{ xs: 2, md: 2 }}
      >
        <Stack sx={{ backgroundColor: 'transparent' }} spacing={2}>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={cid}
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
              {cid}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={`ipfs://${cid}`}
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
              ipfs://{cid}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper>
            <CopyClipboardText
              copyText={`${AIOZ_IPFS_PUBLIC_GATEWAY}${cid}`}
              showText='GATEWAYS URL'
              typoProps={{
                variant: 'subtitle2',
                fontWeight: 'bold',
              }}
            />
            <a href={`${AIOZ_IPFS_PUBLIC_GATEWAY}${cid}`} target='_blank'>
              <Typography
                variant='body1'
                sx={{
                  textDecoration: 'underline',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {cid}
              </Typography>
            </a>
          </ResultPinWrapper>
        </Stack>
        <Stack alignItems={'center'}>
          <ButtonCustomized
            sx={{
              width: { xs: '100%', md: '394px' },
              minWidth: { xs: 'unset', md: '394px' },
            }}
            variant='contained'
            color='secondary'
            size='large'
            onClick={() => {
              handleCloseUploadFile()
            }}
          >
            Manage IPFS Files
          </ButtonCustomized>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default IpfsFileUploadResult
