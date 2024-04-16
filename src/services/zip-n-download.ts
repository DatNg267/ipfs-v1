import { downloadActions } from '@/redux/download-and-zipping/reducer'
import { useAppDispatch } from '@/redux/hooks'
import Promise from 'bluebird'
import FileSaver from 'file-saver'
import JsZip from 'jszip'
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'
import { useCallback } from 'react'
export const files_per_group = 5
export type RequestZippingFolderFromUrls = {
  files: {
    url: string
    fileName: string
  }[]
  folderName?: string
  size: number
}

export type ResponseDownloadedFile = {
  blob: Blob | any
  fileName: string
}
export function useDownload(): (
  url: string,
  fileName: string,
  id: string,
  signal: AbortSignal
) => Promise<ResponseDownloadedFile> {
  const dispatch = useAppDispatch()

  return useCallback(
    async (url, fileName, id, signal) => {
      const response = await fetch(url, {
        signal: signal,
      })
        .then(async (response: any) => {
          const contentLength = response.headers.get('Content-Length') || '0'
          const contentType = response.headers.get('Content-Type') || ''

          if (!response.body) {
            throw new Error('Failed to get the response body')
          }
          const totalSize = parseInt(contentLength, 10)
          const reader = response.body.getReader()

          let chunks: Uint8Array[] = []
          let loadedSize = 0
          function read(): Promise<ResponseDownloadedFile> {
            return reader
              .read()
              .then(async ({ done, value }: { done: any; value: any }) => {
                if (done) {
                  return {
                    blob: new Blob(chunks, {
                      type: contentType,
                    }),
                    fileName: fileName,
                  }
                }

                chunks.push(value)
                loadedSize += value.length
                const percentage = (loadedSize / totalSize) * 100
                dispatch(
                  downloadActions.updateSizeDownloaded({
                    id,
                    sizeDownloaded: value.length,
                  })
                )

                return await read()
              })
          }
          return await read()
        })
        .catch((err) => {
          if (
            err.message === 'The user aborted a request.' ||
            err.message ===
              `Failed to execute 'fetch' on 'Window': The user aborted a request.` ||
            err.message.includes('aborted')
          ) {
            throw err
          }
        })
      return response
    },
    [dispatch]
  )
}

export const useDownloadByGroup = (): ((
  request: RequestZippingFolderFromUrls['files'],
  files_per_group: number,
  id: string,
  signal: AbortSignal
) => Promise<any>) => {
  const handleDownloaded = useDownload()
  return (request, files_per_group = 5, id, signal) =>
    Promise.map(
      request,
      async ({
        url,
        fileName,
      }: RequestZippingFolderFromUrls['files'][0] & { id: string }) => {
        const fileDownloaded = await handleDownloaded(url, fileName, id, signal)
        return fileDownloaded
      },
      { concurrency: files_per_group }
    )
}

export const useExportZip = (): ((
  blobs: ResponseDownloadedFile[],
  id: string,
  folderName?: string
) => any) => {
  const dispatch = useAppDispatch()

  return useCallback(
    (blobs, id, folderName) => {
      const zip = JsZip()
      blobs.forEach((blob: any, i: any) => {
        if (blob && blob.blob.type && blob.fileName) {
          const fileExtension = blob.blob.type.split('/')[1]
          zip.file(`${blob.fileName}.${fileExtension}`, blob.blob)
        } else if (blob) {
          zip.file(`file-${i}`, blob.blob)
        } else {
          return
        }
      })
      zip.generateAsync({ type: 'blob' }).then((zipFile: any) => {
        const currentDate = new Date().getTime()
        const fileName = folderName
          ? `aioz-ipfs-w3storage-${folderName}.zip`
          : `aioz-ipfs-w3storage-${currentDate}.zip`
        return FileSaver.saveAs(zipFile, fileName)
      })
      dispatch(downloadActions.done(id))
    },
    [dispatch]
  )
}

export const useDownloadAndZip = (): ((
  request: RequestZippingFolderFromUrls
) => void) => {
  const dispatch = useAppDispatch()
  const handleDownloadByGroup = useDownloadByGroup()
  const handleExportZip = useExportZip()

  return useCallback(
    async (request: RequestZippingFolderFromUrls) => {
      const bytes = new TextEncoder().encode(
        new Date().getTime().toString() + request.folderName
      )
      const hash = await sha256.digest(raw.encode(bytes))
      const cid = CID.create(1, raw.code, hash)

      dispatch(downloadActions.initState(cid.toString()))
      dispatch(
        downloadActions.setInitData({
          id: cid.toString(),
          totalSize: request.size,
          type: 'folder',
          name: request.folderName || '',
        })
      )
      dispatch(
        downloadActions.updateStatus({
          id: cid.toString(),
          status: 'pending',
        })
      )
      const controller = new AbortController()
      const signal = controller.signal
      dispatch(
        downloadActions.updateController({
          id: cid.toString(),
          abortController: controller,
        })
      )
      return handleDownloadByGroup(request.files, 5, cid.toString(), signal)
        .then((res: ResponseDownloadedFile[]) => {
          handleExportZip(res, cid.toString(), request.folderName)
        })
        .catch((err: any) => {
          if (
            err.message === 'The user aborted a request.' ||
            err.message ===
              `Failed to execute 'fetch' on 'Window': The user aborted a request.`
          ) {
            dispatch(
              downloadActions.updateStatus({
                id: cid.toString(),
                status: 'canceled',
              })
            )
          }
        })
    },
    [dispatch, handleDownloadByGroup, handleExportZip]
  )
}
