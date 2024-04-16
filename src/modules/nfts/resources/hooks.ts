import { axiosAuthorized } from '@/apis/_axiosAuth'
import { nftApis } from '@/apis/nft'
import {
  GetNftByIdRequest,
  GetNftByIdResponse,
  GetNftsRequest,
  GetNftsResponse,
  PinNftByCidReponse,
  PinNftReponse,
  PinNftRequest,
  UnpinNftReponse,
  UnpinNftRequest,
} from '@/apis/nft/type'
import {
  useResetCurrentProgress,
  useUpdateCurrentProgress,
} from '@/redux/cancel-progress/hooks'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { useWrapperFunctionTokenExpired } from '@/services'
import { UserErrorMessage, getError } from '@/utils/error'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export const useGetNfts = (): (({
  offset,
  limit,
  pinned,
  sortBy,
  sortOrder,
}: GetNftsRequest) => Promise<GetNftsResponse>) => {
  const func = ({
    offset,
    limit,
    pinned,
    sortBy,
    sortOrder,
  }: GetNftsRequest) => {
    return nftApis.getNfts({ offset, limit, pinned, sortBy, sortOrder })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useGetNft = (): (({
  nftId,
}: GetNftByIdRequest) => Promise<GetNftByIdResponse>) => {
  const func = ({ nftId }: GetNftByIdRequest) => {
    return nftApis.getNftById({ nftId })
  }
  return useWrapperFunctionTokenExpired(func)
}
export const usePinNft = () => {
  const [progress, setProgress] = useState(0)
  const handleOpenModalNotEnoughBalance = useOpenModal(
    ApplicationModal.NOT_ENOUGH_BALANCE
  )
  const handleResetCurrentProgress = useResetCurrentProgress()
  const handleUpdateCurrentProgress = useUpdateCurrentProgress()

  const func = async ({ metadata, file }: PinNftRequest) => {
    try {
      let formData = new FormData()
      formData.append(`file`, file)
      formData.append(`metadata`, metadata, 'metadata.json')
      const cancelToken = axios.CancelToken
      const source = cancelToken.source()

      handleUpdateCurrentProgress(source)
      const response: Promise<PinNftReponse> = await axiosAuthorized
        .post('/nft/', formData, {
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
  const handlePinNft = useWrapperFunctionTokenExpired(func)

  return {
    handlePinNft,
    progress,
    setProgress,
  }
}

export const useUnpinNft = (): (({
  nftId,
}: UnpinNftRequest) => Promise<UnpinNftReponse>) => {
  const func = ({ nftId }: UnpinNftRequest) => {
    return nftApis.unpin({ nftId })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const usePinNftByCid = (): (({
  cid,
  metadata,
}: {
  cid: string
  metadata: File | Blob
}) => Promise<PinNftByCidReponse>) => {
  const handleOpenModalNotEnoughBalance = useOpenModal(
    ApplicationModal.NOT_ENOUGH_BALANCE
  )
  const handleUpdateCurrentProgress = useUpdateCurrentProgress()
  const handleResetCurrentProgress = useResetCurrentProgress()

  const func = async ({
    cid,
    metadata,
  }: {
    cid: string
    metadata: File | Blob
  }) => {
    try {
      let formData = new FormData()
      formData.append(`metadata`, metadata, 'metadata.json')
      formData.append(`cid`, cid)

      const cancelToken = axios.CancelToken
      const source = cancelToken.source()
      handleUpdateCurrentProgress(source)

      const response: Promise<PinNftByCidReponse> = await axiosAuthorized
        .post(
          `/nft/?cid=${cid}`,
          {
            metadata,
          },
          {
            cancelToken: source.token,
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((res) => res.data)
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
  return useWrapperFunctionTokenExpired(func)
}
