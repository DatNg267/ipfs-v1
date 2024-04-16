import axios from 'axios'
import { IPFSGetFolderResponse } from './type'

const BASE_URL = process.env.NEXT_PUBLIC_AIOZ_PUBLIC_IPFS_GATEWAY
export const IPFSApis = {
  //[GET]
  getFolder: (cid: string): Promise<IPFSGetFolderResponse> => {
    const request = new Request(BASE_URL + cid + '/?format=dag-json', {
      method: 'GET',
    })
    return fetch(request).then((res) => res.json())
  },
}
