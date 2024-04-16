import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY, breakpoints } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { UserErrorMessage, getError } from '@/utils/error'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { NftsPageContext, usePinNftByCid } from '../../resources'
import CodeCheck from '../code-check'
import { PinNftByCidReponse } from '@/apis/nft/type'
import { UploadNftByCidContenxt } from '.'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { isEmpty } from 'lodash'
import ButtonCustomized from '@/components/atoms/button'
import {
  useStartAnimateLoading,
  useStopAnimateLoading,
} from '@/redux/upload-wrapper/hooks'
type Props = {
  cid: string
  metadata: string
  handleUpdatePinResponse: (res: PinNftByCidReponse) => void
  handleBackStep: () => void
  handleNextStep: () => void
}
enum Message {
  PINNING_SUCCESS = 'Pinning success',
  PINNING_FAIL = 'Pinning fail',
}
const StepPinningByCid = ({
  cid,
  metadata,
  handleUpdatePinResponse,
  handleBackStep,
  handleNextStep,
}: Props) => {
  const handlePinNftByCid = usePinNftByCid()
  const [statusUpload, setStatusUpload] = useState<AppStatusAction>(null)
  const { handleRefreshList } = useContext(NftsPageContext)
  const { handleSetPinError, pinError } = useContext(UploadNftByCidContenxt)
  const handleStartLoading = useStartAnimateLoading()
  const handleStopLoading = useStopAnimateLoading()

  const handleUpload = useCallback(async () => {
    setStatusUpload('pending')
    try {
      if (!metadata) {
        toast.error('upload fail')
        return
      }
      handleStartLoading()
      // const metadataFile = new File([metadataString], 'metadata.json')
      const metadataFile = new Blob([metadata], {
        type: 'application/json',
      })
      if (cid && metadataFile) {
        await handlePinNftByCid({
          cid,
          metadata: metadataFile,
        }).then((res) => {
          handleUpdatePinResponse(res)
          handleRefreshList()
          toast.success(Message.PINNING_SUCCESS)
          handleNextStep()
          setStatusUpload('success')
        })
        handleStopLoading()
      }
    } catch (error) {
      const err = getError(error, Message.PINNING_FAIL)

      if (err.error.message !== UserErrorMessage.USER_NOT_ENOUGH_BALANCE) {
        handleSetPinError(err.error.message)
      }
      setStatusUpload('fail')
      handleStopLoading()
    }
  }, [
    metadata,
    handleStartLoading,
    cid,
    handlePinNftByCid,
    handleStopLoading,
    handleUpdatePinResponse,
    handleRefreshList,
    handleNextStep,
    handleSetPinError,
  ])

  return (
    <Stack
      justifyContent={'space-between'}
      flex={1}
      spacing={{ xs: 2, md: 8 }}
      overflow={'hidden'}
    >
      {cid && (
        <Stack
          mt={{ xs: 2, md: 8 }}
          spacing={{ xs: 2, md: 8 }}
          flex={1}
          sx={{ height: '100%' }}
        >
          <Stack spacing={2} overflow={'hidden'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant='subtitle1' fontWeight={'bold'}>
                Step #1: Enter Your CID
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              sx={{
                p: 4,
                border: '1px solid',
                borderRadius: APP_BORDER_RADIUS_PRIMARY,
                borderColor: 'divider',
                overflowX: 'auto',
              }}
              spacing={2}
            >
              {cid}
              {statusUpload === 'fail' && pinError && (
                <SvgIconCustomized
                  component={Icons.CircleError}
                  sx={{
                    fontSize: '20px',
                    color: 'error.main',
                  }}
                />
              )}
            </Stack>
            {/* <FormHelperTextCustomized error={!isEmpty(pinError)}>
              {pinError}
            </FormHelperTextCustomized> */}
          </Stack>
          <Stack spacing={2} flex={1} overflow={'hidden'}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <Typography variant='subtitle1' fontWeight={'bold'}>
                Step #2: Upload NFTs Metadata
              </Typography>
              {statusUpload === 'success' && (
                <SvgIconCustomized
                  component={Icons.CircleCheckFilled}
                  sx={{
                    fontSize: '20px',
                  }}
                />
              )}
            </Stack>

            <Stack
              className='codecheck-wrapper'
              sx={{
                p: 4,
                border: '1px solid',
                borderRadius: APP_BORDER_RADIUS_PRIMARY,
                borderColor: 'divider',
                [breakpoints.down('md')]: {
                  maxHeight: '400px',
                },
              }}
              overflow={'hidden'}
            >
              <CodeCheck codeString={metadata} />
            </Stack>
          </Stack>
        </Stack>
      )}
      <Stack
        spacing={{ xs: 2, md: 4 }}
        alignItems={'center'}
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
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

export default StepPinningByCid
