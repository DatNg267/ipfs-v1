import { axiosAuthorized } from '../_axiosAuth'
import { axiosClient } from '../_axiosClient'
import {
  GetNftByIdRequest,
  GetNftByIdResponse,
  GetNftsRequest,
  GetNftsResponse,
  PinNftByCidReponse,
  PinNftByCidRequest,
  PinNftReponse,
  PinNftRequest,
  UnpinNftReponse,
  UnpinNftRequest,
} from './type'

const nftBaseUrl = '/nft/'
export const nftApis = {
  //[GET]
  getNftById: ({ nftId }: GetNftByIdRequest): Promise<GetNftByIdResponse> => {
    return axiosAuthorized
      .get(nftBaseUrl + `${nftId}`)
      .then((response) => response.data)
  },
  getNfts: ({
    limit,
    offset,
    pinned,
    sortBy = 'created_at',
    sortOrder = 'DESC',
  }: GetNftsRequest): Promise<GetNftsResponse> => {
    return axiosAuthorized
      .get(nftBaseUrl + 'nfts', {
        params: {
          limit,
          offset,
          pinned,
          sortBy,
          sortOrder,
        },
      })
      .then((response) => response.data)
  },

  //[POST]
  pinNft: ({
    metadata,
    file,
    options,
  }: PinNftRequest): Promise<PinNftReponse> => {
    return axiosAuthorized
      .post(nftBaseUrl, {
        //data
      })
      .then((response) => {
        return response.data
      })
  },
  pinByCid: ({
    cid,
    pinOptions,
  }: PinNftByCidRequest): Promise<PinNftByCidReponse> => {
    return axiosAuthorized
      .post(nftBaseUrl, {
        cid,
        pinOptions,
      })
      .then((response) => {
        return response.data
      })
  },
  // [DELETE]
  unpin: ({ nftId }: UnpinNftRequest): Promise<UnpinNftReponse> => {
    return axiosAuthorized
      .delete(nftBaseUrl + 'unpin/' + `${nftId}`, {
        //data
      })
      .then((response) => {
        return response.data
      })
  },
}
