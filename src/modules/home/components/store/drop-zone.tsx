import LocalFilesUploaded from '@/modules/ipfs-files/components/local-files-uploaded'
import { generateCid } from '@/services/cid'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import StepDemoStoreResult from './step-result'
import ButtonCustomized from '@/components/atoms/button'
import { useCreateIpfsFileDemo } from '@/modules/ipfs-files/resources'
import { CreateIpfsFileReponse } from '@/apis/pinning/type'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'

type Props = {
  handleChangeTabIndex: (e: any, tabIndex: number) => void
}

const StoreDropZone = ({ handleChangeTabIndex }: Props) => {
  const [files, setFiles] = useState<File[] | null>(null)
  const [statusUpload, setStatusUpload] = useState<AppStatusAction>(null)
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null)
  const [response, setResponse] = useState<CreateIpfsFileReponse | null>(null)
  const totalSize = useMemo(() => {
    if (!files) return '0'
    let total = BigInt(0)
    files.forEach((element: File) => {
      total = total + BigInt(element.size)
    })
    return total.toString(10)
  }, [files])
  const errorSize = useMemo(() => {
    if (Number(totalSize) > 5 * 1024 * 1024) {
      return 'File is larger than 5 Mb'
    } else return ''
  }, [totalSize])
  const { progress, setProgress, handleCreateIpfsFile } =
    useCreateIpfsFileDemo()
  const [cid, setCid] = useState('')

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles)
    setProgress(0)
    setStatusUpload(null)
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, open } =
    useDropzone({
      onError: (err) => {
        console.log(err)
      },
      onDrop,
      noClick: true,
      noKeyboard: true,
      onDropAccepted: (acceptedFiles) => {
        if (acceptedFiles[0]) {
          let blob = new Blob([acceptedFiles[0]])
        }
      },
      onDropRejected(fileRejections, event) {
        console.log(fileRejections)
        if (fileRejections) {
        }
      },
    })
  const timeOutRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (statusUpload === 'success') {
      if (timeOutRef.current) clearInterval(timeOutRef.current)
      timeOutRef.current = null
    }
  }, [statusUpload])
  const handleUpload = async () => {
    if (files) {
      // const cid = await generateCid(files)
      // setCid(cid.toString())
      try {
        setStatusUpload('pending')
        await handleCreateIpfsFile({
          metadata: {},
          files: files,
        }).then((res) => {
          setUploadSuccess(true)
          setStatusUpload('success')
          setResponse(res)
          handleChangeTabIndex(null, 1)
        })
        // timeOutRef.current = setInterval(() => {
        //   setProgress((prev) => {
        //     if (prev < 100) {
        //       return prev + 20
        //     } else {
        //       setstatusUpload('success')
        //       setUploadSuccess(true)
        //       if (timeOutRef.current) clearInterval(timeOutRef.current)
        //       handleChangeTabIndex(null, 1)
        //       return 100
        //     }
        //   })
        // }, 200)
      } catch (error) {}
    }
  }
  return (
    <Stack sx={{ height: '100%', overflow: 'hidden' }}>
      {uploadSuccess && response && (
        <StepDemoStoreResult
          cid={response.data.cid}
          handleClose={() => {
            setUploadSuccess(false)
            setFiles(null)
            setStatusUpload(null)
            handleChangeTabIndex(null, 0)
          }}
        />
      )}

      {!uploadSuccess && (
        <>
          <Box
            {...getRootProps()}
            sx={{ flex: files && files.length > 0 ? 0 : 1 }}
          >
            <input {...getInputProps()} />
            <Stack
              flex={1}
              sx={{ height: '100%' }}
              alignItems={'center'}
              justifyContent={'center'}
              p={{ xs: '0', md: '28px' }}
            >
              <Box>
                <Stack direction='column' alignItems={'center'}>
                  <Typography
                    variant='h5'
                    textAlign={'center'}
                    fontWeight={'bold'}
                    component='span'
                  >
                    Drag and Drop files
                  </Typography>
                  <Typography
                    onClick={open}
                    variant='body1'
                    color='text.secondary'
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    component='span'
                    textAlign={'center'}
                  >
                    or select a file to upload
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>

          {files && (
            <>
              <Stack
                sx={{
                  flex: 1,
                  border: '1px solid',
                  borderColor: 'border.light',
                  backgroundColor: 'transparent',
                  borderRadius: APP_BORDER_RADIUS_PRIMARY,
                  p: 4,
                  minHeight: '100px',
                }}
                justifyContent={'space-between'}
              >
                <Box flex={1}>
                  <LocalFilesUploaded
                    files={files}
                    progress={progress}
                    statusUpload={statusUpload}
                    listProps={{
                      sx: { maxHeight: '200px' },
                    }}
                  />
                </Box>
                <FormHelperTextCustomized
                  error={!!errorSize}
                  sx={{
                    marginLeft: 0,
                    marginTop: '8px',
                  }}
                >
                  {errorSize}
                </FormHelperTextCustomized>
                {statusUpload !== 'success' && (
                  <ButtonCustomized
                    variant='contained'
                    color='secondary'
                    size='large'
                    sx={{
                      px: '80px',
                      marginTop: '8px',
                    }}
                    fullWidth
                    animateDisabled={statusUpload === 'pending'}
                    disabled={!!!files || !!errorSize}
                    onClick={
                      statusUpload === 'pending' ? () => {} : handleUpload
                    }
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
              </Stack>
            </>
          )}
        </>
      )}
    </Stack>
  )
}

export default StoreDropZone
