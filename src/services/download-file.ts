import { useAppDispatch } from '@/redux/hooks'
import { downloadActions } from '@/redux/download-and-zipping/reducer'
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { useCallback } from 'react'
import FileSaver from 'file-saver'
import { PUBLIC_GATEWAY } from '@/constants/gateways'
import { useDownload } from './zip-n-download'

export type RequestDownloadFile = {
  cid: string
  size: number
  fileName?: string
  gateway: string
}

export const useDownloadFile = (): ((request: RequestDownloadFile) => void) => {
  const dispatch = useAppDispatch()
  const handleDownload = useDownload()
  return useCallback(
    async ({ fileName, size, cid }: RequestDownloadFile) => {
      const bytes = new TextEncoder().encode(
        new Date().getTime().toString() + fileName
      )
      const hash = await sha256.digest(raw.encode(bytes))
      const newId = CID.create(1, raw.code, hash)
      const currentDate = new Date().getTime()

      const newFileName = fileName
        ? `${fileName}`
        : `aioz-ipfs-w3storage-${currentDate}`

      dispatch(downloadActions.initState(newId.toString()))
      dispatch(
        downloadActions.setInitData({
          id: newId.toString(),
          totalSize: size,
          type: 'file',
          name: newFileName,
        })
      )
      dispatch(
        downloadActions.updateStatus({
          id: newId.toString(),
          status: 'pending',
        })
      )
      const controller = new AbortController()
      const signal = controller.signal
      dispatch(
        downloadActions.updateController({
          id: newId.toString(),
          abortController: controller,
        })
      )
      const url = PUBLIC_GATEWAY + cid
      try {
        const file = await handleDownload(
          url,
          newFileName,
          newId.toString(),
          signal
        )

        FileSaver.saveAs(file.blob, newFileName)
        dispatch(downloadActions.done(newId.toString()))
      } catch (err: any) {
        if (
          err.message === 'The user aborted a request.' ||
          err.message ===
            `Failed to execute 'fetch' on 'Window': The user aborted a request.`
        ) {
          dispatch(
            downloadActions.updateStatus({
              id: newId.toString(),
              status: 'canceled',
            })
          )
        }
      }
    },
    [dispatch, handleDownload]
  )
}
