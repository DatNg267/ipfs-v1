import { GatewayApis } from '@/apis/gateway'
import {
  GetGatewaysRequest,
  GetGatewaysResponse,
  GetStatusSubcribeGatewaysRequest,
  GetStatusSubcribeGatewaysResponse,
  SubcribeGatewaysRequest,
  SubcribeGatewaysResponse,
  UnsubcribeGatewaysRequest,
  UnsubcribeGatewaysResponse,
} from '@/apis/gateway/type'
import { useOpenModal } from '@/redux/modal/hooks'
import { ApplicationModal } from '@/redux/modal/reducer'
import { useWrapperFunctionTokenExpired } from '@/services'
import { getError, UserErrorMessage } from '@/utils/error'
import { toast } from 'react-hot-toast'

export const useGetStatusSubcribeGateways =
  (): (({}: GetStatusSubcribeGatewaysRequest) => Promise<GetStatusSubcribeGatewaysResponse>) => {
    const func = ({}: GetStatusSubcribeGatewaysRequest) => {
      return GatewayApis.getStatusSubcribe({})
    }
    return useWrapperFunctionTokenExpired(func)
  }

export const useGetGateways = (): (({
  offset,
  limit,
  type,
}: GetGatewaysRequest) => Promise<GetGatewaysResponse>) => {
  const func = ({ offset, limit, type }: GetGatewaysRequest) => {
    return GatewayApis.getGateways({ offset, limit, type })
  }
  return useWrapperFunctionTokenExpired(func)
}

export const useSubcribeGateways =
  (): (({}: SubcribeGatewaysRequest) => Promise<SubcribeGatewaysResponse>) => {
    const handleOpenModalNotEnoughBalance = useOpenModal(
      ApplicationModal.NOT_ENOUGH_BALANCE
    )

    const func = ({}: SubcribeGatewaysRequest) => {
      return GatewayApis.subcribe().catch((error) => {
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

export const useUnsubcribeGateways =
  (): (({}: UnsubcribeGatewaysRequest) => Promise<UnsubcribeGatewaysResponse>) => {
    const func = ({}: UnsubcribeGatewaysRequest) => {
      return GatewayApis.unsubcribe()
    }
    return useWrapperFunctionTokenExpired(func)
  }
