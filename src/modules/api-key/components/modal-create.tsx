import { CreateApiKeyReponse } from '@/apis/api-keys/type'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { InputBaseStyled } from '@/components/atoms/input/base'
import { SwitchStyled } from '@/components/atoms/select'
import WrapperPopup from '@/components/molecules/wrapper-popup'
import PopupHeading from '@/components/molecules/wrapper-popup/popup-heading'
import { usePageColor } from '@/hooks/usePageColor'
import { useAppSelector } from '@/redux/hooks'
import { useCloseModal, useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { ScrollBarStyled } from '@/themes/_theme'
import { AppStatusAction } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
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
import { ApiKeysPageContext, useCreateApiKey } from '../resources'
import ModalInfoApiKey from './modal-info'
import { generateFieldIsRequired } from '@/utils'
import ButtonCustomized from '@/components/atoms/button'

type Props = {}

const formSchema = yup.object({
  name: yup
    .string()
    .required(generateFieldIsRequired('key name'))
    .max(100)
    .test(
      'key-name-validate',
      (d: any) => generateFieldIsRequired('key name'),
      (value: any) => {
        return !(value.trim() === '')
      }
    ),
  admin: yup.boolean().required(),

  nftList: yup.boolean().required(),
  pinList: yup.boolean().required(),

  pinNftToIpfs: yup.boolean().required(),
  unpinNft: yup.boolean().required(),

  pinByHash: yup.boolean().required(),
  pinFileToIpfs: yup.boolean().required(),
  unpin: yup.boolean().required(),
})

const ModalCreateApiKey = (props: Props) => {
  const getColor = usePageColor()
  const color = getColor()

  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()

  const handleOpenModalInfo = useOpenModal(ApplicationModal.CREATE_API_KEY_INFO)
  const [status, setStatus] = useState<AppStatusAction>(null)

  const handleCreateApiKey = useCreateApiKey()
  const [error, setError] = useState<string | null>(null)

  const [responseCreated, setResponseCreated] =
    useState<CreateApiKeyReponse | null>(null)

  const { handleRefreshApiKeysList } = useContext(ApiKeysPageContext)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      admin: true,
      nftList: true,
      pinList: true,
      pinNftToIpfs: true,
      unpinNft: true,
      pinByHash: true,
      pinFileToIpfs: true,
      unpin: true,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    setError(null)
    setStatus(null)
    reset()
  }, [openModal === ApplicationModal.CREATE_API_KEY])

  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])

  const onSubmit = async (data: any) => {
    if (
      !data.admin &&
      !data.nftList &&
      !data.pinList &&
      !data.pinByHash &&
      !data.pinFileToIpfs &&
      !data.unpin &&
      !data.pinNftToIpfs &&
      !data.unpinNft
    ) {
      toast.error('must choose at least one permission')
      return
    }

    setResponseCreated(null)
    setStatus('pending')
    await handleCreateApiKey({
      name: data.name,
      scopes: {
        admin: data.admin,
        data: {
          nft_list: data.nftList,
          pin_list: data.pinList,
        },
        pinning: {
          pin_by_hash: data.pinByHash,
          pin_file_to_ipfs: data.pinFileToIpfs,
          unpin: data.unpin,
        },
        pin_nft: {
          pin_nft_to_ipfs: data.pinNftToIpfs,
          unpin_nft: data.unpinNft,
        },
      },
    })
      .then((res) => {
        toast.success('Create success')
        setResponseCreated(res)
        handleOpenModalInfo()
        handleRefreshApiKeysList()
        setStatus('success')
      })
      .catch((err) => {
        setError(err.message)
        toast.error(err.message)
        setStatus('fail')
      })
  }
  useEffect(() => {
    const subscription = watch((...props) => {
      const [values, target] = props
      if (!target.name) return
      if (target.name !== 'admin' && target.name !== 'name') {
        if (!values[target.name] && values['admin']) {
          setValue('admin', false)
          return
        }
        const isExistsFieldFalse = Object.keys(values).findIndex(
          (item: string) => item !== 'name' && item !== 'admin' && !values[item]
        )
        if (!values['admin'] && isExistsFieldFalse === -1) {
          setValue('admin', true)
          return
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Box>
      <ModalInfoApiKey responseCreated={responseCreated} />
      <Modal
        open={openModal === ApplicationModal.CREATE_API_KEY}
        sx={{
          overflow: 'hidden',
        }}
        onClose={handleCloseModal}
      >
        <WrapperPopup>
          <Stack
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              overflow: 'hidden',
              maxHeight: '90vh',
            }}
          >
            <PopupHeading
              mainColor={color}
              title='Create New API Key'
              handleCloseModal={handleCloseModal}
              disabledClose={status === 'pending'}
            />

            <Paper
              sx={{
                p: 4,
                overflow: 'auto',
                ...ScrollBarStyled,
              }}
            >
              <Stack spacing={4}>
                {/* Admin */}
                <Stack spacing={2}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>
                    Admin
                  </Typography>
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Controller
                      name='admin'
                      control={control}
                      render={({ field }) => (
                        <SwitchStyled
                          {...field}
                          onChange={(e) => {
                            setValue('nftList', e.target.checked)
                            setValue('pinList', e.target.checked)
                            setValue('pinByHash', e.target.checked)
                            setValue('pinFileToIpfs', e.target.checked)
                            setValue('pinNftToIpfs', e.target.checked)
                            setValue('unpinNft', e.target.checked)
                            setValue('unpin', e.target.checked)
                            field.onChange(e)
                          }}
                          sx={{
                            color: (theme) => theme.palette.dotOrange[500],
                          }}
                          checked={watch('admin')}
                        />
                      )}
                    ></Controller>
                    <Typography variant='body2'>
                      Admin Keys have access to all endpoints and account
                      settings
                    </Typography>
                  </Stack>
                </Stack>
                <Divider></Divider>

                {/* Data */}
                <Stack spacing={2}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>
                    Data
                  </Typography>
                  <Grid container>
                    <Grid item xs={5}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name='pinList'
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              checked={watch('pinList')}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                            />
                          )}
                        />
                        <Typography variant='body2'>Pin List</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={7}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name='nftList'
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              checked={watch('nftList')}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                            />
                          )}
                        />
                        <Typography variant='body2'>NFT List</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>

                {/* Pinning NFT */}
                <Stack spacing={2}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>
                    Pinning Services API
                  </Typography>
                  <Grid container>
                    <Grid item xs={5}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name={'pinByHash'}
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              checked={watch('pinByHash')}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                            />
                          )}
                        ></Controller>
                        <Typography variant='body2'>Pin by Hash</Typography>
                      </Stack>

                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name={'unpin'}
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                              checked={watch('unpin')}
                            />
                          )}
                        ></Controller>
                        <Typography variant='body2'>Unpin</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={7}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name={'pinFileToIpfs'}
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              checked={watch('pinFileToIpfs')}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                            />
                          )}
                        ></Controller>
                        <Typography variant='body2'>
                          Pin file to IPFS
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>

                <Stack spacing={2}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>
                    Pinning NFT
                  </Typography>
                  <Grid container>
                    <Grid item xs={5}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name={'pinNftToIpfs'}
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              checked={watch('pinNftToIpfs')}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                            />
                          )}
                        ></Controller>
                        <Typography variant='body2'>Pin NFT to IPFS</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={7}>
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={3}
                      >
                        <Controller
                          name={'unpinNft'}
                          control={control}
                          render={({ field }) => (
                            <SwitchStyled
                              {...field}
                              sx={{
                                color: (theme) => theme.palette.dotOrange[500],
                              }}
                              checked={watch('unpinNft')}
                            />
                          )}
                        ></Controller>
                        <Typography variant='body2'>Unpin NFT</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>

                {/* Key name */}
                <Stack spacing={2}>
                  <Typography variant='subtitle2' fontWeight={'bold'}>
                    Key Name
                  </Typography>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <InputBaseStyled
                        variant='standard'
                        {...field}
                        placeholder='Key name'
                      ></InputBaseStyled>
                    )}
                  ></Controller>
                  <FormHelperTextCustomized error={!!errors.name?.message}>
                    {errors.name?.message}
                  </FormHelperTextCustomized>
                </Stack>

                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='secondary'
                  size='large'
                  animateDisabled={status === 'pending'}
                  type={status === 'pending' ? 'button' : 'submit'}
                  disabled={!isEmpty(errors) || !isValid}
                  startIcon={
                    status === 'pending' && (
                      <CircularProgress
                        size={22}
                        sx={{
                          color: 'primary',
                        }}
                      />
                    )
                  }
                >
                  Create Key
                </ButtonCustomized>
              </Stack>
            </Paper>
          </Stack>
        </WrapperPopup>
      </Modal>
    </Box>
  )
}

export default ModalCreateApiKey
