import { ResultPinWrapper } from '@/components/atoms/result-pin-wrapper'
import CopyClipboardText from '@/components/molecules/copy-text'
import { Paper, Stack, Typography } from '@mui/material'
import FolderInfo from '../preview-file/components/folder-info'
import FileInfo from './file-info'
import { truncateAddress } from '@/utils'

type Props = {
  cid: string
  size: number
  totalFiles: number
  name: string
  isFolder: boolean
}
const AIOZ_IPFS_PUBLIC_GATEWAY =
  process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY

const ContentCid = ({ cid, size, totalFiles, name, isFolder }: Props) => {
  return (
    <>
      <Paper sx={{ px: 4, py: 2, mx: 0 }}>
        <Typography fontWeight={600} variant='body1'>
          Get Your Link!
        </Typography>
      </Paper>
      <Paper
        sx={{
          backgroundColor: 'background.paper',
          p: 4,
          m: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={2}>
          <ResultPinWrapper
            sx={{
              px: 2,
              py: 1,
              border: 'none',
              borderBottom: '1px solid',
              borderRadius: '0px',
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
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
              }}
            >
              {truncateAddress(cid)}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper
            sx={{
              px: 2,
              py: 1,
              border: 'none',
              borderBottom: '1px solid',
              borderRadius: '0px',
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
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
              }}
            >
              {`ipfs://${truncateAddress(cid)}`}
            </Typography>
          </ResultPinWrapper>
          <ResultPinWrapper
            sx={{
              px: 2,
              py: 1,
              border: 'none',
              borderBottom: '1px solid',
              borderRadius: '0px',
              gap: 2,
              display: 'flex',
              flexDirection: 'column',
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
                }}
              >
                {truncateAddress(cid)}
              </Typography>
            </a>
          </ResultPinWrapper>
        </Stack>
        {isFolder && (
          <FolderInfo totalFiles={totalFiles} name={name} size={size} />
        )}

        {!isFolder && <FileInfo name={name} size={size} hash={cid} />}
      </Paper>
    </>
  )
}

export default ContentCid
