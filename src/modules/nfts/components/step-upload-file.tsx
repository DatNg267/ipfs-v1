import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { formatFileSize } from '@/utils/tools'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'

type Props = {
  step: number
  file: null | File
  handleUpdateFile: (file: File) => void
  setStep: Dispatch<SetStateAction<number>>
}
const formSchema = yup.object({
  name: yup.string().required(),
})

const StepUploadFile = ({ handleUpdateFile, file, step, setStep }: Props) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        handleUpdateFile(acceptedFiles[0])
      }
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections) {
      }
    },
  })

  return (
    <>
      <Stack {...getRootProps()} flex={1} className='drop-zone'>
        <input {...getInputProps()} />
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          onClick={open}
          flex={1}
          sx={{ cursor: 'pointer' }}
          spacing={4}
        >
          <SvgIconCustomized
            component={Icons.Folder}
            sx={{
              fontSize: '72px',
            }}
          ></SvgIconCustomized>
          <Typography variant='h4'>Drag and Drop file</Typography>
          <Typography
            variant='body1'
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'text.secondary',
            }}
          >
            or select a file to upload
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={4}>
        {file && (
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
              border: '1px solid',
              borderColor: (theme) => theme.palette.baseGray[400],
              backgroundColor: 'transparent',
              borderRadius: APP_BORDER_RADIUS_PRIMARY,
              p: 4,
            }}
          >
            <Typography variant='body1' fontWeight={'medium'}>
              {file.name}
            </Typography>

            <Typography variant='body1' fontWeight={'medium'}>
              {formatFileSize(file.size).size} {formatFileSize(file.size).unit}
            </Typography>
          </Stack>
        )}

        <ButtonCustomized
          sx={{
            px: '100px',
          }}
          variant='contained'
          color='secondary'
          size='large'
          disabled={!!!file}
          onClick={() => setStep((prev: any) => prev + 1)}
        >
          Continue
        </ButtonCustomized>
      </Stack>
    </>
  )
}

export default StepUploadFile
