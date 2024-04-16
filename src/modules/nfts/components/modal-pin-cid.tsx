import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { InputBaseStyled } from '@/components/atoms/input/base'
import { SvgIconCustomized } from '@/components/atoms/svg-icon'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import { usePageColor } from '@/hooks/usePageColor'
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
  InputAdornment,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { isEmpty } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { NftsPageContext, usePinNftByCid } from '../resources'
import HeadingModal from '@/components/molecules/heading-modal'
import ButtonCustomized from '@/components/atoms/button'

const formSchema = yup.object({
  cid: yup.string().required(),
})

const ModalPinNftByCid = () => {
  const handleGetPageColor = usePageColor()
  const color = handleGetPageColor()
  const [statusUpload, setstatusUpload] = useState<AppStatusAction>(null)

  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const handlePinByCid = usePinNftByCid()

  const [error, setError] = useState<string | null>(null)

  const { handleRefreshList } = useContext(NftsPageContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cid: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    setError(null)
    reset()
  }, [openModal === ApplicationModal.PIN_NFT_BY_CID])

  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])

  const onSubmit = async (data: any) => {
    // setstatusUpload('pending')
    // await handlePinByCid({
    //   cid: data.cid,
    // })
    //   .then((res) => {
    //     toast.success('Pin success')
    //     handleRefreshList()
    //     handleCloseModal()
    //     setstatusUpload('success')
    //   })
    //   .catch((err) => {
    //     // toast.error(err.message)
    //     setError(err.message)
    //     setstatusUpload('fail')
    //   })
  }
  return (
    <>
      <Modal open={openModal === ApplicationModal.PIN_NFT_BY_CID}>
        <WrapperPopup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeadingModal title='Pin NFT' />
            <Paper
              sx={{
                p: 4,
              }}
            >
              <Stack spacing={4}>
                {/* Admin */}
                <Stack spacing={2}>
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

                <Stack direction='row' spacing={4}>
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
                    type={statusUpload === 'pending' ? undefined : 'submit'}
                    disabled={!isEmpty(errors) || !isValid}
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

export default ModalPinNftByCid
