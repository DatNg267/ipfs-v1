import { axiosAuthorized } from '@/apis/_axiosAuth'
import { ipfsFilesApi } from '@/apis/pinning'
import {
  CreateIpfsFileReponse,
  CreateIpfsFileRequest,
  DeleteIpfsFileReponse,
  DeleteIpfsFileRequest,
  EditMetadataFilesReponse,
  EditMetadataFilesRequest,
  GetFileReponse,
  GetFileRequest,
  GetIpfsFilesReponse,
  GetIpfsFilesRequest,
  PinFileByCidReponse,
} from '@/apis/pinning/type'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { useWrapperFunctionTokenExpired } from '@/services'
import { UserErrorMessage, getError } from '@/utils/error'
import { useEffect, useState } from 'react'
import axios, { CancelToken } from 'axios'
import {
  useCancelProgress,
  usePreventNavigate,
  useResetCurrentProgress,
  useUpdateCurrentProgress,
} from '@/redux/cancel-progress/hooks'
import { boolean } from 'zod'
import { toast } from 'react-hot-toast'
export const useGetIpfsFiles = (): (({
  offset,
  limit,
  pinned,
  sortBy,
  sortOrder,
}: GetIpfsFilesRequest) => Promise<GetIpfsFilesReponse>) => {
  const func = ({
    offset,
    limit,
    pinned,
    sortBy,
    sortOrder,
  }: GetIpfsFilesRequest) => {
    return ipfsFilesApi.getAll({ offset, limit, pinned, sortBy, sortOrder })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useGetFile = (): (({
  pinId,
}: GetFileRequest) => Promise<GetFileReponse>) => {
  const func = ({ pinId }: GetFileRequest) => {
    return ipfsFilesApi.getFile({ pinId })
  }
  return func
}
export const useCreateIpfsFileDemo = () => {
  const [progress, setProgress] = useState(0)

  const handleUpdateCurrentProgress = useUpdateCurrentProgress()
  const handleResetCurrentProgress = useResetCurrentProgress()
  // const { turnOn, turnOff } = usePreventNavigate()
  const func = async ({ metadata, files }: CreateIpfsFileRequest) => {
    try {
      let formData = new FormData()
      for (let index = 0; index < files.length; index++) {
        formData.append(`file`, files[index])
      }
      formData.append(
        `metadata`,
        JSON.stringify({
          name: metadata.name,
        })
      )
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      handleUpdateCurrentProgress(source)

      const response: Promise<CreateIpfsFileReponse> = await axiosAuthorized
        .post('/pinning/demo', formData, {
          cancelToken: source.token,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
              : 0
            setProgress(progress)
          },
        })
        .then((res) => res.data)
      // turnOff()
      handleResetCurrentProgress()
      return response
    } catch (error) {
      handleResetCurrentProgress()
      throw new Error(getError(error).error.message)
    }
  }
  const handleCreateIpfsFile = func

  return {
    handleCreateIpfsFile,
    progress,
    setProgress,
  }
}

export const useCreateIpfsFile = () => {
  const [progress, setProgress] = useState(0)
  const handleOpenModalNotEnoughBalance = useOpenModal(
    ApplicationModal.NOT_ENOUGH_BALANCE
  )
  const handleUpdateCurrentProgress = useUpdateCurrentProgress()
  const handleResetCurrentProgress = useResetCurrentProgress()
  // const { turnOn, turnOff } = usePreventNavigate()
  const func = async ({ metadata, files }: CreateIpfsFileRequest) => {
    try {
      let formData = new FormData()
      for (let index = 0; index < files.length; index++) {
        formData.append(`file`, files[index])
      }
      formData.append(
        `metadata`,
        JSON.stringify({
          name: metadata.name,
        })
      )
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      handleUpdateCurrentProgress(source)
      // turnOn()
      const response: Promise<CreateIpfsFileReponse> = await axiosAuthorized
        .post('/pinning/', formData, {
          cancelToken: source.token,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
              : 0
            setProgress(progress)
          },
        })
        .then((res) => res.data)
      // turnOff()
      handleResetCurrentProgress()
      return response
    } catch (error) {
      handleResetCurrentProgress()
      const errorConvert = getError(error)
      if (
        errorConvert.type === 'axios' &&
        errorConvert.error.message === UserErrorMessage.USER_NOT_ENOUGH_BALANCE
      ) {
        handleOpenModalNotEnoughBalance()
      } else {
        toast.error(getError(error).error.message)
      }

      throw new Error(getError(error).error.message)
    }
  }
  const handleCreateIpfsFile = useWrapperFunctionTokenExpired(func)

  return {
    handleCreateIpfsFile,
    progress,
    setProgress,
  }
}

export const useDeleteIpfsFile = (): (({
  pinId,
}: DeleteIpfsFileRequest) => Promise<DeleteIpfsFileReponse>) => {
  const func = ({ pinId }: DeleteIpfsFileRequest) => {
    return ipfsFilesApi.delete({ pinId })
  }
  return useWrapperFunctionTokenExpired(func)
}
export const useEditFiles = (): (({
  id,
  metadata,
}: EditMetadataFilesRequest) => Promise<EditMetadataFilesReponse>) => {
  const func = ({ id, metadata }: EditMetadataFilesRequest) => {
    return ipfsFilesApi.editMetadata({ id, metadata })
  }
  return useWrapperFunctionTokenExpired(func)
}
export const usePinFileByCid = (): (({
  cid,
  name,
}: {
  cid: string
  name: string
}) => Promise<PinFileByCidReponse>) => {
  const handleOpenModalNotEnoughBalance = useOpenModal(
    ApplicationModal.NOT_ENOUGH_BALANCE
  )
  const func = ({ cid, name }: { cid: string; name: string }) => {
    return ipfsFilesApi
      .pinByCid({
        payload: {
          hash_to_pin: cid,
          metadata: {
            name: name,
            description: name,
          },
        },
        pinOptions: {
          cid_version: 0,
          hostNodes: ['string'],
          wrap_with_directory: true,
        },
      })
      .catch((error) => {
        const errorConvert = getError(error)
        if (
          errorConvert.type === 'axios' &&
          errorConvert.error.message ===
            UserErrorMessage.USER_NOT_ENOUGH_BALANCE
        ) {
          handleOpenModalNotEnoughBalance()
        } else {
          toast.error(getError(error).error.message)
        }

        throw new Error(getError(error).error.message)
      })
  }
  return useWrapperFunctionTokenExpired(func)
}
