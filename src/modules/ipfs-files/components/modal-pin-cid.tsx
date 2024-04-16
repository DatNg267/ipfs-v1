import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { InputBaseStyled } from '@/components/atoms/input/base'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { Icons } from '@/themes/_icons'
import { AppStatusAction } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { isEmpty } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { IpfsFilesPageContext, usePinFileByCid } from '../resources'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import ButtonCustomized from '@/components/atoms/button'

type Props = {}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '632px',
}
const MotionBox = motion(Box)
const MotionModal = motion(Modal)

const formSchema = yup.object({
  cid: yup.string().required(),
  name: yup.string().required(),
})

const ModalPinByCid = (props: Props) => {
  const getColor = usePageColor()
  const color = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()

  const handlePinFileByCid = usePinFileByCid()
  const [error, setError] = useState<string | null>(null)
  const [statusUpload, setstatusUpload] = useState<AppStatusAction>(null)

  const { handleRefreshList } = useContext(IpfsFilesPageContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cid: '',
      name: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    setError(null)
    reset()
  }, [openModal === ApplicationModal.PIN_BY_CID])

  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])

  const onSubmit = async (data: any) => {
    setError(null)
    setstatusUpload('pending')
    await handlePinFileByCid({
      name: data.name,
      cid: data.cid,
    })
      .then((res) => {
        toast.success('Pin success')
        handleRefreshList()
        handleCloseModal()
        setstatusUpload('success')
      })
      .catch((err) => {
        // toast.error(err.message)
        setError(err.message)
        setstatusUpload('fail')
      })
  }
  return (
    <>
      <Modal
        onClose={handleCloseModal}
        open={openModal === ApplicationModal.PIN_BY_CID}
      >
        <WrapperPopup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PopupHeading
              mainColor={color}
              title='PIN BY CID'
              handleCloseModal={handleCloseModal}
              disabledClose={statusUpload === 'pending'}
            />

            <Paper
              sx={{
                p: 4,
              }}
            >
              <Stack spacing={4}>
                {/* Admin */}
                <Stack spacing={{ xs: 4, md: 2 }}>
                  <Typography variant='body2'>
                    Provide a Content Identifier(CID), also known as a hash, to
                    pin and an optional name for that pin. W3IPFS.STORAGE will
                    then add the CID to the queue and start searching for your
                    content. Once your content has been found, it will be
                    pinned.
                  </Typography>
                  <Typography variant='body2'>
                    <b>Please note:</b> The AIOZ network is big, and it might
                    take quite some time to find / retrieve content. Please be
                    patient as our nodes search for your content. It is also
                    possible that the content is no longer available on the
                    network. In that scenario, your pin by CID action will fail.
                  </Typography>
                </Stack>
                <Box>
                  <Controller
                    name='cid'
                    control={control}
                    render={({ field }) => (
                      <InputBaseStyled
                        variant='standard'
                        {...field}
                        fullWidth
                        placeholder='IPFS CID To Pin'
                        InputProps={{
                          endAdornment: error ? (
                            <InputAdornment position='end'>
                              {/* <CircularProgress size={24}></CircularProgress> */}
                              <SvgIconCustomized
                                component={Icons.CloseCircle}
                                sx={{
                                  color: (theme) => theme.palette.error.main,
                                }}
                              />
                            </InputAdornment>
                          ) : (
                            <></>
                          ),
                        }}
                        error={!!error}
                      ></InputBaseStyled>
                    )}
                  ></Controller>
                  <FormHelperTextCustomized
                    error={!!error}
                    sx={{
                      mt: 2,
                      ml: 0,
                    }}
                  >
                    {error}
                  </FormHelperTextCustomized>
                </Box>

                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <InputBaseStyled
                      variant='standard'
                      {...field}
                      placeholder='Custom Name For Pin '
                    ></InputBaseStyled>
                  )}
                ></Controller>

                <Stack
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  spacing={4}
                >
                  <ButtonCustomized
                    variant='outlined'
                    fullWidth
                    color='secondary'
                    size='large'
                    type='submit'
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </ButtonCustomized>
                  <ButtonCustomized
                    variant='contained'
                    fullWidth
                    color='secondary'
                    size='large'
                    animateDisabled={statusUpload === 'pending'}
                    disabled={!isEmpty(errors) || !isValid}
                    type={statusUpload === 'pending' ? undefined : 'submit'}
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
                    Search and Pin
                  </ButtonCustomized>
                </Stack>
              </Stack>
            </Paper>
          </form>
        </WrapperPopup>
      </Modal>
    </>
  )
}

export default ModalPinByCid
