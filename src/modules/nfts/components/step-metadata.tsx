import { Box, Button, Stack } from '@mui/material'
import EditCode from './code-edit'
import UploadJson from './upload-json'
import { FormErrorMessage } from '@/utils/error'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { isArray, isArrayLike } from 'lodash'
import { parseArgs } from 'util'
import { clearEmptyKeys } from '@/utils'
import { breakpoints } from '@/themes/_theme'
import ButtonCustomized from '@/components/atoms/button'

type Props = {
  metadata: string | null
  handleUpdateMetadata: any
  handleBackStep: any
  handleNextStepUploadMetadata: any
}

const StepMetadata = (props: Props) => {
  const {
    metadata,
    handleUpdateMetadata,
    handleBackStep,
    handleNextStepUploadMetadata,
  } = props
  const [jsonUploaded, setJsonUploaded] = useState<string | null>(null)
  const [formatJsonError, setFormatJsonError] = useState<string | null>(null)

  const handleUploadJsonFile = (jsonFile: File) => {
    if (!jsonFile) {
      toast.error('Upload file error')
      return
    }
    const reader = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (e.target) {
        const fileContent = e.target?.result
        if (!fileContent) return
        const jsonData = JSON.parse(fileContent?.toString())
        setJsonUploaded(JSON.stringify(jsonData, null, 2))
      } else {
        toast.error('Upload file error')
        return
      }
    }
    reader.readAsText(jsonFile)
  }

  const handleChangeMetadata = (metadata: string) => {
    try {
      JSON.parse(metadata)
      if (Array.isArray(JSON.parse(metadata))) {
        setFormatJsonError(FormErrorMessage.CANNOT_INPUT_JSON_ARRAY)
        return
      }
      setFormatJsonError(null)
    } catch (error) {
      setFormatJsonError(FormErrorMessage.METADATA_FORMAT_IS_NOT_VALID)
    }
    handleUpdateMetadata(metadata)
  }

  return (
    <Stack
      spacing={{ xs: 2, md: 4 }}
      flex={1}
      justifyContent={'flex-end'}
      sx={{
        overflow: 'hidden',
        height: '100%',
        [breakpoints.down('md')]: {
          maxHeight: '500px',
        },
      }}
    >
      <EditCode
        metadata={metadata}
        jsonUploaded={jsonUploaded}
        handleChangeMetadata={handleChangeMetadata}
        error={formatJsonError}
        setError={setFormatJsonError}
      />
      <UploadJson handleUploadJsonFile={handleUploadJsonFile} />
      <Stack direction='row' spacing={4} alignItems={'center'}>
        <ButtonCustomized
          variant='outlined'
          color='secondary'
          size='large'
          fullWidth
          onClick={handleBackStep}
        >
          Back
        </ButtonCustomized>
        <ButtonCustomized
          variant='contained'
          color='secondary'
          size='large'
          fullWidth
          disabled={!!formatJsonError}
          onClick={handleNextStepUploadMetadata}
        >
          Continue
        </ButtonCustomized>
      </Stack>
    </Stack>
  )
}

export default StepMetadata
