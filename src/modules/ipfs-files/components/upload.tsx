import { CreateIpfsFileReponse, GetFileReponse } from '@/apis/pinning/type'
import UploadWrapper from '@/components/molecules/upload-wrapper'
import CodeExample from '@/components/organisms/code-example'
import ResultPreviewFolder from '@/components/organisms/preview-file/folder'
import ResultPreviewFile from '@/components/organisms/preview-file/nfts'
import {
  CODE_GET_FILE_BY_CID_STRING,
  CODE_UPLOAD_FILE_STRING,
} from '@/constants/code'
import { Box, Container, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { IpfsFilesPageContext, useGetFile } from '../resources'
import IpfsFileUploadResult from './step-result'
import UploadDropZone from './upload-drop-zone'
import {
  useSetFolder,
  useUpdateFolderInfo,
} from '@/redux/modal-review-folder/hooks'
type Props = {}

const UploadFileComponent = (props: Props) => {
  const { step } = useContext(IpfsFilesPageContext)
  const [response, setResponse] = useState<CreateIpfsFileReponse | null>(null)
  const [file, setFile] = useState<GetFileReponse['data'] | null>(null)

  const handleUpdateFolderInfo = useUpdateFolderInfo()

  const handleSetReponse = (response: CreateIpfsFileReponse) => {
    setResponse(response)
    handleUpdateFolderInfo({
      cid: response.data.cid,
      folderName: response.data.metadata.name,
      folderSize: response.data.size,
    })
  }

  const handleGetFile = useGetFile()

  useEffect(() => {
    if (!response) return
    if (response.data.is_dir) return
    if (!response.data.cid) return
    let intervalId = setInterval(() => {
      handleGetFile({ pinId: response.data.id })
        .then((res) => {
          setFile(res.data)
          if (res.data?.pinned) {
            clearInterval(intervalId)
          }
        })
        .catch((err) => {})
    }, 10000)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [response])
  return (
    <Paper
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: { xs: 2, md: '28px' },
        minHeight: '760px',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: '8px', md: '28px' }}
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            height: { xs: '100%', md: 'unset' },
          }}
        >
          <Box
            sx={{
              maxWidth: '794px',
              width: '100%',
              minHeight: { xs: '610px', md: 'unset' },
              maxHeight: { xs: '610px', md: 'unset' },
            }}
          >
            {step === 'Upload' ? (
              <>
                <Box
                  sx={{
                    zIndex: 1,
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <UploadWrapper>{}</UploadWrapper>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      position: 'absolute',
                      top: 28,
                      left: 28,
                      right: 28,
                      bottom: 28,
                    }}
                  >
                    <Paper
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'white',
                        padding: { xs: 2, md: 4 },
                        m: { xs: 0 },
                        boxShadow: 'none',
                      }}
                    >
                      <UploadDropZone handleSetReponse={handleSetReponse} />
                    </Paper>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {response && <IpfsFileUploadResult cid={response.data.cid} />}
              </>
            )}
          </Box>

          <Stack
            flex={1}
            sx={{
              minWidth: { xs: 'unset', md: '400px' },
              height: '792px',
              maxHeight: '792px',
              minHeight: { xs: '544px', md: 'unset' },
              zIndex: 10,
              backgroundColor: 'background.paper',
            }}
          >
            {step !== 'Upload' && response && (
              <>
                {response.data.is_dir && (
                  <ResultPreviewFolder
                    codeString={CODE_GET_FILE_BY_CID_STRING}
                  />
                )}
                {!response.data.is_dir && (
                  <ResultPreviewFile
                    cid={response.data.cid}
                    fileName={response.data.metadata.name}
                    fileSize={file?.size}
                    pinned={file ? file.pinned : false}
                    codeString={CODE_GET_FILE_BY_CID_STRING}
                  />
                )}
              </>
            )}
            {step === 'Upload' && (
              <CodeExample codeString={CODE_UPLOAD_FILE_STRING} />
            )}
          </Stack>
        </Stack>
      </Container>
    </Paper>
  )
}
export default UploadFileComponent
