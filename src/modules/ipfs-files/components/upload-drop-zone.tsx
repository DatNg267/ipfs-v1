import { CreateIpfsFileReponse } from '@/apis/pinning/type'
import ButtonCustomized from '@/components/atoms/button'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import {
  useStartAnimateLoading,
  useStopAnimateLoading,
} from '@/redux/upload-wrapper/hooks'
import { Icons } from '@/themes/_icons'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { getError } from '@/utils/error'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  keyframes,
} from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { IpfsFilesPageContext, useCreateIpfsFile } from '../resources'
import LocalFilesUploaded from './local-files-uploaded'
const animateObj = {
  '0%': {
    height: '0',
  },
  '100%': {
    height: 'auto',
  },
}
const animate = keyframes`
  ${animateObj}
`

type Props = {
  handleSetReponse: (response: CreateIpfsFileReponse) => void
}
const formSchema = yup.object({
  // name: yup.string().when('$files', ([files], schema) => {
  //   return files && files.length > 1
  //     ? schema.required(FormErrorMessage.PLEASE_PROVIDE_NAME_FOR_FOLDER)
  //     : schema
  // }),
})
const UploadDropZone = ({ handleSetReponse }: Props) => {
  const [files, setFiles] = useState<File[] | null>(null)
  const { handleRefreshList, handleCloseUploadFile, handleOpenStep } =
    useContext(IpfsFilesPageContext)
  const { progress, setProgress, handleCreateIpfsFile } = useCreateIpfsFile()
  const [statusUpload, setStatusUpload] = useState<AppStatusAction>(null)
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null)
  const handleStartAnimateLoading = useStartAnimateLoading()
  const handleStopAnimateLoading = useStopAnimateLoading()
  const {
    setError,
    handleSubmit,
    watch,
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema, {}),
    context: {
      files,
    },
    mode: 'onChange',
  })

  const handleUpload = async () => {
    try {
      if (files && files.length > 0) {
        handleStartAnimateLoading()
        setStatusUpload('pending')
        await handleCreateIpfsFile({
          metadata: {},
          files: files,
        }).then((res) => {
          toast.success('Upload success')
          setUploadSuccess(true)
          handleRefreshList()
          setStatusUpload('success')
          handleSetReponse(res)
          handleOpenStep('Result')
        })
        handleStopAnimateLoading()
      }
    } catch (error) {
      setStatusUpload('fail')
      const err = getError(error)
      setUploadSuccess(false)
      handleStopAnimateLoading()
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(acceptedFiles)
      setProgress(0)
      setStatusUpload(null)
      setError('name', { message: undefined })
    },
    [setError, setProgress]
  )

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        let blob = new Blob([acceptedFiles[0]])
        const srcPreview = URL.createObjectURL(blob)
      }
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections) {
      }
    },
  })
  const onSubmit = (value: any) => {
    handleUpload()
  }

  return (
    <Stack
      component={'form'}
      spacing={4}
      flex={1}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ flex: 1 }} alignItems={'center'} justifyContent={'center'}>
        <Stack
          className='drop-zone'
          {...getRootProps()}
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
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
                fontSize: { xs: '36px', md: '72px' },
              }}
            ></SvgIconCustomized>
            <Typography variant='h4'>Drag and Drop files</Typography>
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
      </Stack>

      {files && (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.light',
            backgroundColor: 'transparent',
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            p: 4,
          }}
        >
          <LocalFilesUploaded
            files={files}
            progress={progress}
            statusUpload={statusUpload}
          />
          {statusUpload !== 'success' && (
            <ButtonCustomized
              variant='contained'
              color='secondary'
              size='large'
              sx={{
                px: '80px',
                marginTop: '32px',
              }}
              fullWidth
              disabled={!!!files}
              animateDisabled={statusUpload === 'pending'}
              onClick={statusUpload === 'pending' ? () => {} : handleUpload}
              startIcon={
                statusUpload === 'pending' && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary',
                    }}
                  ></CircularProgress>
                )
              }
            >
              {statusUpload === 'pending' ? 'Uploading' : 'Upload'}
            </ButtonCustomized>
          )}
        </Box>
      )}
    </Stack>
  )
}

export default UploadDropZone
