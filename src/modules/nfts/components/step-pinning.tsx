import { PinNftReponse } from '@/apis/nft/type'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { getError } from '@/utils/error'
import { clearEmptyKeys, formatFileSize } from '@/utils/tools'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import CodeCheck from './code-check'
import { NftsPageContext, usePinNft } from '../resources'
import ButtonCustomized from '@/components/atoms/button'
import {
  useStartAnimateLoading,
  useStopAnimateLoading,
} from '@/redux/upload-wrapper/hooks'
type Props = {
  file: File
  metadata: string
  setPinResponse: Dispatch<SetStateAction<PinNftReponse | null>>
  handleBackStep: () => void
  handleNextStep: () => void
}
enum Message {
  PINNING_SUCCESS = 'Pinning success',
  PINNING_FAIL = 'Pinning fail',
}
const StepPinning = ({
  file,
  metadata,
  setPinResponse,
  handleBackStep,
  handleNextStep,
}: Props) => {
  const { progress, setProgress, handlePinNft } = usePinNft()
  const [statusUpload, setStatusUpload] = useState<AppStatusAction>(null)
  const { handleRefreshList } = useContext(NftsPageContext)
  const handleStartAnimateLoading = useStartAnimateLoading()
  const handleStopAnimateLoading = useStopAnimateLoading()

  const handleUpload = useCallback(async () => {
    setStatusUpload('pending')
    try {
      if (!metadata) {
        toast.error('upload fail')
        return
      }
      handleStartAnimateLoading()
      // const metadataFile = new File([metadataString], 'metadata.json')
      const metadataFile = new Blob(
        [JSON.stringify(clearEmptyKeys(JSON.parse(metadata)))],
        {
          type: 'application/json',
        }
      )
      if (file && metadataFile) {
        await handlePinNft({
          metadata: metadataFile,
          file: file,
        }).then((res) => {
          setPinResponse(res)
          handleRefreshList()
          toast.success(Message.PINNING_SUCCESS)
          handleNextStep()
          setStatusUpload('success')
        })
      }
      handleStopAnimateLoading()
    } catch (error) {
      const err = getError(error, Message.PINNING_FAIL)
      // TOAST IN HOOKS
      // toast.error(err.error.message)
      setStatusUpload('fail')
      handleStopAnimateLoading()
    }
  }, [
    file,
    handleNextStep,
    handlePinNft,
    handleRefreshList,
    handleStartAnimateLoading,
    handleStopAnimateLoading,
    metadata,
    setPinResponse,
  ])

  return (
    <Stack
      justifyContent={'space-between'}
      flex={1}
      spacing={{ xs: 4, md: 8 }}
      overflow={'hidden'}
    >
      {file && (
        <Stack
          mt={{ xs: 4, md: 8 }}
          spacing={{ xs: 4, md: 8 }}
          flex={1}
          justifyContent={'center'}
          overflow={'hidden'}
        >
          <Stack spacing={2}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={1}
              justifyContent={{ xs: 'flex-start' }}
            >
              <Typography variant='subtitle1' fontWeight={'bold'}>
                Step #1: Upload NFTs Asset
              </Typography>
              {statusUpload === 'success' && (
                <SvgIconCustomized
                  component={Icons.CircleCheckFilled}
                  sx={{
                    fontSize: '20p2',
                  }}
                />
              )}
            </Stack>

            <Box
              sx={{
                p: 4,
                border: '1px solid',
                borderRadius: APP_BORDER_RADIUS_PRIMARY,
                borderColor: 'divider',
                overflowX: 'auto',
              }}
            >
              <Typography variant='body1' fontWeight={'medium'}>
                {file.name}
              </Typography>
              <Typography variant='body1'>
                {formatFileSize((progress * file.size) / 100).size}&nbsp;
                {formatFileSize(file.size).unit} &nbsp;of&nbsp;{' '}
                {formatFileSize(file.size).size}{' '}
                {formatFileSize(file.size).unit}
              </Typography>
            </Box>
          </Stack>
          <Stack spacing={2} overflow={'hidden'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant='subtitle1' fontWeight={'bold'}>
                Step #2: Upload NFTs Metadata
              </Typography>
              {statusUpload === 'success' && (
                <SvgIconCustomized
                  component={Icons.CircleCheckFilled}
                  sx={{
                    fontSize: '20p2',
                  }}
                />
              )}
            </Stack>

            <Stack
              sx={{
                p: 4,
                border: '1px solid',
                borderRadius: APP_BORDER_RADIUS_PRIMARY,
                borderColor: 'divider',
              }}
              overflow={'hidden'}
            >
              <CodeCheck codeString={metadata} />
            </Stack>
          </Stack>
        </Stack>
      )}
      <Stack spacing={4} alignItems={'center'} direction={'row'}>
        {statusUpload !== 'success' && (
          <ButtonCustomized
            variant='outlined'
            color='secondary'
            size='large'
            fullWidth
            onClick={handleBackStep}
            disabled={statusUpload === 'pending'}
          >
            Back
          </ButtonCustomized>
        )}
        <ButtonCustomized
          variant='contained'
          color='secondary'
          size='large'
          fullWidth
          animateDisabled={statusUpload === 'pending'}
          startIcon={
            statusUpload === 'pending' && (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'primary',
                  }}
                ></CircularProgress>
              </>
            )
          }
          onClick={() => {
            if (statusUpload === 'pending') {
              return
            } else if (statusUpload === null || statusUpload === 'fail') {
              handleUpload()
            } else if (statusUpload === 'success') {
              handleNextStep()
            }
          }}
        >
          {statusUpload === 'success'
            ? 'Get your link'
            : statusUpload === 'pending'
            ? 'Uploading'
            : statusUpload === 'fail'
            ? 'Try upload again'
            : 'Upload'}
        </ButtonCustomized>
      </Stack>
    </Stack>
  )
}

export default StepPinning
