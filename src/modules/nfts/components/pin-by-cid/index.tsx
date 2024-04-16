import {
  GetNftByIdResponse,
  PinNftByCidReponse,
  PinNftReponse,
} from '@/apis/nft/type'
import { FormErrorMessage } from '@/utils/error'
import { Box, Container, Paper, Stack } from '@mui/material'
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

import UploadHeading from '@/components/molecules/upload-heading'
import UploadWrapper from '@/components/molecules/upload-wrapper'
import CodeExample from '@/components/organisms/code-example'
import {
  CODE_EXAMPLE_METADATA,
  CODE_GET_NFT_BY_ID_STRING,
  CODE_UPLOAD_NFT_BY_CID_STRING,
} from '@/constants/code'
import { NftsPageContext, useGetNft } from '../../resources'
import StepResult from '../step-result'
import StepMetadata from '../step-metadata'
import StepEnterCid from './step-enter-cid'
import StepPinningByCid from './step-pinning'
import ResultPreviewFile from '@/components/organisms/preview-file/nfts'
import { breakpoints } from '@/themes/_theme'

type Props = {
  color: string
}
type UploadByCidContenxtType = {
  cid: string | null
  pinError: string
  pinResponse: PinNftReponse | null
  handleNextStep: () => void
  handleBackStep: () => void
  handleUpdateCid: (cid: string) => void
  handleUpdatePinResponse: (res: PinNftReponse | null) => void
  handleSetPinError: (err: string) => void
}
export const UploadNftByCidContenxt = createContext<UploadByCidContenxtType>({
  cid: null,
  pinError: '',
  pinResponse: null,
  handleNextStep: () => {},
  handleBackStep: () => {},
  handleUpdateCid: (cid: string) => {},
  handleUpdatePinResponse: (res: PinNftByCidReponse | null) => {},
  handleSetPinError: (err: string) => {},
})
const STEP_DESCRIPTION = [
  'Enter Your CID',
  'Upload Metadata',
  'Pinning NFT',
  'Get your link',
]

const UploadNftByCidComponent = ({ color }: Props) => {
  const { handleCloseUploadByCid } = useContext(NftsPageContext)

  const [step, setStep] = useState<number>(1)
  const [metadata, setMetadata] = useState<string>(CODE_EXAMPLE_METADATA)
  const [cid, setCid] = useState<string | null>(null)
  const [pinResponse, setPinResponse] = useState<PinNftByCidReponse | null>(
    null
  )
  const [pinError, setPinError] = useState<string>('')

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
    }, 3000)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [pinResponse])

  const handleSetPinError = (err: string) => setPinError(err)
  const handleUpdateMetadata = (metadata: string) => setMetadata(metadata)
  const handleNextStep = () => setStep((prev) => prev + 1)
  const handleBackStep = () => step > 1 && setStep((prev) => prev - 1)
  const handleUpdatePinResponse = (res: PinNftByCidReponse | null) =>
    setPinResponse(res)
  const handleUpdateCid = (cid: string) => setCid(cid)

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
    <UploadNftByCidContenxt.Provider
      value={{
        pinError,
        cid,
        pinResponse,
        handleNextStep,
        handleBackStep,
        handleUpdateCid,
        handleUpdatePinResponse,
        handleSetPinError,
      }}
    >
      <UploadHeading
        handleCloseUpload={handleCloseUploadByCid}
        color={color}
        text={`Step #${step}: ${STEP_DESCRIPTION[step - 1]}`}
      />
      <Paper
        sx={{
          p: { xs: 2, md: '28px' },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
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
            spacing={{ xs: 4, md: '28px' }}
            sx={{
              minHeight: '800px',
              height: '800px',
              [breakpoints.down('md')]: {
                minHeight: 'unset',
                height: 'unset',
              },
            }}
          >
            <Stack
              flex={1}
              sx={{
                maxWidth: '794px',
                width: '100%',
                [breakpoints.down('md')]: {
                  height: '100%',
                  overflow: 'hidden',
                  minHeight: '443px',
                },
              }}
            >
              {step === 1 && (
                <Stack
                  justifyContent={'space-between'}
                  flex={1}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'border.light',
                    p: '28px',
                    borderRadius: '16px',
                    [breakpoints.down('md')]: {
                      p: 2,
                    },
                  }}
                >
                  <StepEnterCid />
                </Stack>
              )}

              {(step === 3 || step === 2) && (
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
                        {step === 3 && cid && (
                          <StepPinningByCid
                            cid={cid}
                            metadata={metadata}
                            handleUpdatePinResponse={handleUpdatePinResponse}
                            handleBackStep={handleBackStep}
                            handleNextStep={handleNextStep}
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
                      </Paper>
                    </Box>
                  </Box>
                </>
              )}

              {step === 4 && pinResponse && (
                <StepResult
                  response={pinResponse}
                  handleClose={handleCloseUploadByCid}
                />
              )}
            </Stack>
            {step === 4 && pinResponse && (
              <Stack
                flex={1}
                sx={{
                  minWidth: '400px',
                  [breakpoints.down('md')]: {
                    minHeight: '500px',
                    minWidth: 'unset',
                  },
                }}
              >
                <ResultPreviewFile
                  cid={pinResponse.data.asset_cid}
                  fileName={pinResponse.data.metadata_asset.name}
                  fileSize={filePinned?.size}
                  pinned={filePinned ? filePinned.pinned : false}
                  codeString={CODE_GET_NFT_BY_ID_STRING}
                />
              </Stack>
            )}
            {step !== 4 && (
              <Stack
                flex={1}
                sx={{
                  minWidth: '400px',
                  [breakpoints.down('md')]: {
                    minHeight: '500px',
                    minWidth: 'unset',
                  },
                }}
              >
                <CodeExample codeString={CODE_UPLOAD_NFT_BY_CID_STRING} />
              </Stack>
            )}
          </Stack>
        </Container>
      </Paper>
    </UploadNftByCidContenxt.Provider>
  )
}
export default UploadNftByCidComponent
