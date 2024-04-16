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
  Modal,
  Paper,
  Stack,
  Typography,
  inputBaseClasses,
} from '@mui/material'
import { motion } from 'framer-motion'
import { isEmpty } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import { IpfsFilesPageContext, useEditFiles } from '../resources'
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
  name: yup.string().required(),
  keyvalues: yup
    .array(
      yup
        .object({
          key: yup.string().nullable(),
          value: yup.string().nullable(),
        })
        .nullable()
    )
    .nullable(),
})
type FormValueType = {
  name: string
  keyvalues: { key: string; value: string }[] | []
}
const defaultValues: FormValueType = {
  name: '',
  keyvalues: [
    {
      key: '',
      value: '',
    },
  ],
}
const ModalEditIpfsFile = (props: Props) => {
  const getColor = usePageColor()
  const color = getColor()
  const { openModal } = useAppSelector((state) => state.appModal)
  const handleCloseModal = useCloseModal()
  const [statusAction, setStatusAction] = useState<AppStatusAction>(null)

  const handleEdit = useEditFiles()
  const { handleRefreshList, selectedItemEdit } =
    useContext(IpfsFilesPageContext)

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: defaultValues,
    values: {
      ...{
        name: selectedItemEdit?.metadata.name || '',
        keyvalues: selectedItemEdit?.metadata.keyvalues
          ? [
              ...Object.keys(selectedItemEdit?.metadata.keyvalues).map(
                (item, index) => {
                  return {
                    key: item || '',
                    value: selectedItemEdit?.metadata.keyvalues
                      ? (Object.values(selectedItemEdit?.metadata.keyvalues)[
                          index
                        ] as string)
                      : '',
                  }
                }
              ),
              {
                key: '',
                value: '',
              },
            ]
          : [
              {
                key: '',
                value: '',
              },
            ],
      },
    },
    mode: 'onChange',
  })
  const { fields, append, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'keyvalues',
  })

  useEffect(() => {
    reset(defaultValues)
  }, [selectedItemEdit])

  useEffect(() => {
    reset()
  }, [openModal === ApplicationModal.EDIT_IPFS_FILE])

  useEffect(() => {
    return () => {
      handleCloseModal()
    }
  }, [])
  const generateRequestKeyValues = (keyvalues: { key: any; value: any }[]) => {
    try {
      let res = {}
      keyvalues.forEach((element: { key: any; value: any }) => {
        if (element.key || element.value)
          res = {
            ...res,
            [`${element.key}`]: element.value,
          }
      })
      return res
    } catch (error) {
      return {}
    }
  }
  const onSubmit = async (data: any) => {
    try {
      if (selectedItemEdit) {
        setStatusAction('pending')
        await handleEdit({
          id: selectedItemEdit.pinId,
          metadata: {
            name: data.name,
            keyvalues: generateRequestKeyValues(data.keyvalues),
            type: selectedItemEdit.metadata.type,
          },
        })
      }
      toast.success('Edit success!')
      setStatusAction('success')
      handleCloseModal()
      handleRefreshList()
    } catch (error) {
      setStatusAction('fail')
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    const subscription = watch((...props) => {
      const [data, target] = props
      const numberOfKeyvalues = data.keyvalues?.length || null
      if (
        data.keyvalues &&
        target.name &&
        target.name.includes('keyvalues') &&
        numberOfKeyvalues
      ) {
        if (
          numberOfKeyvalues !== null &&
          target.name?.includes(`keyvalues.${numberOfKeyvalues - 1}.`) &&
          !isEmpty(data.keyvalues[numberOfKeyvalues - 1]?.key) &&
          !isEmpty(data.keyvalues[numberOfKeyvalues - 1]?.value)
        ) {
          append({
            key: '',
            value: '',
          })
          return
        }
        const index1 =
          target.name && target.name?.includes(`keyvalues`)
            ? (target.name as string).indexOf('.')
            : -1
        const index2 =
          target.name && target.name?.includes(`keyvalues`)
            ? (target.name as string).lastIndexOf('.')
            : -1
        let indexSelected = null
        if (index1 > -1 && index2 > -1) {
          const strSlice = target.name?.slice(index1 + 1, index2)
          if (strSlice && strSlice.length > 0) {
            indexSelected = parseInt(strSlice)
          }
        }
        if (indexSelected === null) return

        if (
          numberOfKeyvalues !== null &&
          isEmpty(data.keyvalues[indexSelected]?.key) &&
          isEmpty(data.keyvalues[indexSelected]?.value) &&
          (!isEmpty(data.keyvalues[indexSelected + 1]?.key) ||
            !isEmpty(data.keyvalues[indexSelected + 1]?.value))
        ) {
          remove(indexSelected)
          return
        }

        if (
          numberOfKeyvalues !== null &&
          isEmpty(data.keyvalues[indexSelected]?.key) &&
          isEmpty(data.keyvalues[indexSelected]?.value) &&
          isEmpty(data.keyvalues[indexSelected + 1]?.key) &&
          isEmpty(data.keyvalues[indexSelected + 1]?.value)
        ) {
          remove(indexSelected + 1)
          return
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <>
      <MotionModal
        onClose={handleCloseModal}
        open={openModal === ApplicationModal.EDIT_IPFS_FILE}
      >
        <WrapperPopup>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PopupHeading
              mainColor={color}
              title='Edit File Details'
              handleCloseModal={handleCloseModal}
              disabledClose={statusAction === 'pending'}
            />

            <Paper
              sx={{
                p: 4,
              }}
            >
              <Stack spacing={4}>
                {/* Admin */}
                <Stack spacing={2}>
                  <Typography variant='body1' fontWeight={'medium'}>
                    Change Name
                  </Typography>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <InputBaseStyled
                        variant='standard'
                        {...field}
                        placeholder='Name'
                        sx={{
                          [`& .${inputBaseClasses.input}`]: {
                            padding: '12px 0 9px',
                          },
                        }}
                      ></InputBaseStyled>
                    )}
                  ></Controller>
                </Stack>
                {/* Key name */}
                <Stack spacing={4}>
                  <Typography variant='body1' fontWeight={'medium'}>
                    Add New Key/Value
                  </Typography>
                  {fields.map((field, index) => (
                    <Stack spacing={8} direction={'row'} key={field.id}>
                      <Controller
                        name={`keyvalues.${index}.key`}
                        control={control}
                        render={({ field }) => (
                          <InputBaseStyled
                            fullWidth
                            variant='standard'
                            {...field}
                            placeholder='Key'
                            sx={{
                              [`& .${inputBaseClasses.input}`]: {
                                padding: '12px 0 9px',
                              },
                            }}
                          />
                        )}
                      ></Controller>
                      <Controller
                        name={`keyvalues.${index}.value`}
                        control={control}
                        render={({ field }) => (
                          <InputBaseStyled
                            fullWidth
                            variant='standard'
                            {...field}
                            placeholder='Value '
                            sx={{
                              [`& .${inputBaseClasses.input}`]: {
                                padding: '12px 0 9px',
                              },
                            }}
                          />
                        )}
                      ></Controller>
                    </Stack>
                  ))}
                </Stack>

                <ButtonCustomized
                  variant='contained'
                  fullWidth
                  color='secondary'
                  size='large'
                  animateDisabled={statusAction === 'pending'}
                  type={statusAction === 'pending' ? undefined : 'submit'}
                  disabled={!isEmpty(errors) || !isValid}
                  startIcon={
                    statusAction === 'pending' && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: 'primary',
                        }}
                      />
                    )
                  }
                >
                  Save
                </ButtonCustomized>
              </Stack>
            </Paper>
          </form>
        </WrapperPopup>
      </MotionModal>
    </>
  )
}

export default ModalEditIpfsFile
