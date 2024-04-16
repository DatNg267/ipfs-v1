import { Box, Button, Input, Stack, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { fontSize } from '@/themes/font'
import { APP_BORDER_RADIUS_PRIMARY } from '@/themes/_theme'
import FormHelperTextCustomized from '@/components/atoms/form-helper-text'
import { UploadNftByCidContenxt } from '.'
import { isEmpty } from 'lodash'
import { NftsPageContext } from '../../resources'
import ButtonCustomized from '@/components/atoms/button'

const formSchema = yup.object({
  cid: yup.string().required('Cis is required'),
})
type Props = {}
const StepEnterCid = (props: Props) => {
  const { handleCloseUploadByCid } = useContext(NftsPageContext)
  const { handleNextStep, handleUpdateCid, cid, pinError, handleSetPinError } =
    useContext(UploadNftByCidContenxt)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cid: '',
    },
    values: {
      cid: cid,
    },

    mode: 'onChange',
  })

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => handleSetPinError(''))
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (value: any) => {
    handleUpdateCid(value.cid)
    handleNextStep()
  }
  return (
    <Stack
      justifyContent={'space-between'}
      sx={{ height: '100%' }}
      spacing={'28px'}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        flex={1}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          p: '28px',
          borderRadius: '8px',
        }}
      >
        <Typography variant='body1'>
          Provide a Content Identifier(CID), also known as a hash, to pin and an
          optional name for that pin. W3IPFS.STORAGE will then add the CID to
          the queue and start searching for your content. Once your content has
          been found, it will be pinned.
        </Typography>
        <Typography variant='body1' mt={8}>
          <b>Please note:</b> The AIOZ network is big, and it might take quite
          some time to find / retrieve content. Please be patient as our nodes
          search for your content. It is also possible that the content is no
          longer available on the network. In that scenario, your pin by CID
          action will fail.
        </Typography>
      </Stack>
      <Box>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          sx={{
            // border: '1px solid',
            // borderColor: (theme) => theme.palette.baseGray[400],
            backgroundColor: 'transparent',
            borderRadius: APP_BORDER_RADIUS_PRIMARY,
            // p: 4,
          }}
        >
          <TextField
            {...register('cid')}
            variant='standard'
            // disableUnderline
            label='IPFS CID To Pin'
            error={!!errors.cid?.message || !!pinError}
            // helperText={errors.cid?.message || pinError}
            sx={{
              border: 'none',
              width: '100%',
              paddingRight: 4,
              '& input': {
                padding: 0,
                ...fontSize[18],
                fontWeight: 'medium',
              },
            }}
          />
        </Stack>
        <FormHelperTextCustomized
          sx={{
            ml: 0,
          }}
          error={!!errors.cid?.message || !isEmpty(pinError)}
        >
          {errors.cid?.message || pinError}
        </FormHelperTextCustomized>
      </Box>
      <Stack direction='row' spacing={4} alignItems={'center'}>
        <ButtonCustomized
          variant='outlined'
          color='secondary'
          size='large'
          fullWidth
          type='submit'
          onClick={handleCloseUploadByCid}
        >
          Cancel
        </ButtonCustomized>
        <ButtonCustomized
          variant='contained'
          color='secondary'
          size='large'
          fullWidth
          type='submit'
          disabled={!isEmpty(errors.cid) || !isValid}
        >
          Continue
        </ButtonCustomized>
      </Stack>
    </Stack>
  )
}

export default StepEnterCid
