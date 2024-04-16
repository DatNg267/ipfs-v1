import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { formatFileSize } from '@/utils/tools'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

type Props = {
  handleUploadJsonFile: (jsonFile: File) => void
}

const UploadJson = ({ handleUploadJsonFile }: Props) => {
  const [file, setFile] = useState<File | null>(null)

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      'application/json': ['.json'],
    },
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setFile(acceptedFiles[0])
        handleUploadJsonFile(acceptedFiles[0])
      }
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections) {
        toast.error('Upload file error')
      }
    },
  })

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: '1px solid',
          borderColor: (theme) => theme.palette.baseGray[400],
          backgroundColor: 'transparent',
          borderRadius: APP_BORDER_RADIUS_PRIMARY,
          p: 4,
        }}
      >
        <input {...getInputProps()} />
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Typography
            onClick={open}
            variant='body2'
            fontWeight={400}
            color={'text.secondary'}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Or select Metadata.json file
          </Typography>
        </Stack>
      </Box>
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
    </>
  )
}

export default UploadJson
