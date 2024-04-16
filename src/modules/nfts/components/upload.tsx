import {
  GetNftByIdRequest,
  GetNftByIdResponse,
  PinNftReponse,
} from '@/apis/nft/type'
import { FormErrorMessage } from '@/utils/error'
import { Box, Container, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import StepMetadata from './step-metadata'
import StepPinning from './step-pinning'
import StepResult from './step-result'
import StepUploadFile from './step-upload-file'
import { NftsPageContext, useGetNft, useGetNfts } from '../resources'
import {
  CODE_EXAMPLE_METADATA,
  CODE_GET_NFT_BY_ID_STRING,
  CODE_UPLOAD_NFT_STRING,
} from '@/constants/code'
import UploadHeading from '@/components/molecules/upload-heading'
import UploadWrapper from '@/components/molecules/upload-wrapper'
import CodeExample from '@/components/organisms/code-example'
import ResultPreviewFile from '@/components/organisms/preview-file/nfts'
import { breakpoints } from '@/themes/_theme'

type Props = {
  color: string
}
const STEP_DESCRIPTION = [
  'Upload NFT Asset',
  'Upload NFT Metadata',
  'Upload All',
  'Get your link!',
]
const UploadNftComponent = ({ color }: Props) => {
  const { handleCloseUpload } = useContext(NftsPageContext)

  const [step, setStep] = useState<number>(1)
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<string | null>(CODE_EXAMPLE_METADATA)
  const [pinResponse, setPinResponse] = useState<PinNftReponse | null>(null)

  const [filePinned, setFilePinned] = useState<
    GetNftByIdResponse['data'] | null
  >(null)
  const handleGetFile = useGetNft()

  useEffect(() => {
    if (!pinResponse) return
    if (!pinResponse.data.asset_cid) return
    let intervalId = setInterval(() => {
      handleGetFile({ nftId: pinResponse.data.id })
        .then((res) => {
          setFilePinned(res.data)
          if (res.data?.pinned) {
            clearInterval(intervalId)
          }
        })
        .catch((err) => {})
    }, 10000)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [pinResponse])

  const handleUpdateMetadata = (metadata: string) => setMetadata(metadata)
  const handleNextStep = () => setStep((prev) => prev + 1)
  const handleBackStep = () => step > 1 && setStep((prev) => prev - 1)
  const handleUpdateFile = (file: File) => setFile(file)
  const handleNextStepUploadMetadata = () => {
    try {
      if (!metadata || metadata === null) {
        return
      }
      const check = JSON.parse(metadata)
      handleNextStep()
    } catch (error) {
      toast.error(FormErrorMessage.METADATA_FORMAT_IS_NOT_VALID)
    }
  }

  return (
    <>
      <UploadHeading
        handleCloseUpload={handleCloseUpload}
        color={color}
        text={`Step #${step}: ${STEP_DESCRIPTION[step - 1]}`}
      />
      <Paper
        sx={{
          p: { xs: 2, md: '28px' },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
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
            direction={{ sx: 'column', md: 'row' }}
            spacing={{ xs: 2, md: '28px' }}
            sx={{
              minHeight: '760px',
              height: '760px',
              [breakpoints.down('md')]: {
                minHeight: 'unset',
                height: 'unset',
              },
            }}
          >
            <Box
              sx={{
                maxWidth: '794px',
                width: '100%',
                [breakpoints.down('md')]: {
                  minHeight: '577px',
                  height: '577px',
                },
              }}
            >
              {step !== 4 && (
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
                      {step === 1 && (
                        <StepUploadFile
                          step={1}
                          file={file}
                          handleUpdateFile={handleUpdateFile}
                          setStep={setStep}
                        />
                      )}
                      {step === 2 && (
                        <StepMetadata
                          metadata={metadata}
                          handleUpdateMetadata={handleUpdateMetadata}
                          handleBackStep={handleBackStep}
                          handleNextStepUploadMetadata={
                            handleNextStepUploadMetadata
                          }
                        />
                      )}
                      {step === 3 && file && metadata && (
                        <StepPinning
                          setPinResponse={setPinResponse}
                          file={file}
                          metadata={metadata}
                          handleNextStep={handleNextStep}
                          handleBackStep={handleBackStep}
                        />
                      )}
                    </Paper>
                  </Box>
                </Box>
              )}

              {step === 4 && pinResponse && (
                <StepResult
                  response={pinResponse}
                  handleClose={handleCloseUpload}
                />
              )}
            </Box>
            <Stack
              flex={1}
              sx={{
                minWidth: '400px',
                [breakpoints.down('md')]: {
                  minWidth: 'unset',
                  minHeight: '500px',
                },
                zIndex: 10,
                backgroundColor: 'background.paper',
              }}
            >
              {step === 4 && pinResponse && (
                <ResultPreviewFile
                  cid={pinResponse.data.asset_cid}
                  fileName={pinResponse.data.metadata_asset.name}
                  fileSize={filePinned?.size}
                  pinned={filePinned ? filePinned.pinned : false}
                  codeString={CODE_GET_NFT_BY_ID_STRING}
                />
              )}
              {step !== 4 && (
                <CodeExample codeString={CODE_UPLOAD_NFT_STRING} />
              )}
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </>
  )
}
export default UploadNftComponent
