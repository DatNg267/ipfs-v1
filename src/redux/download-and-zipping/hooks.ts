import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { downloadActions } from './reducer'

export const useCancelDownload = (): ((id: string) => void) => {
  const data = useAppSelector((state) => state.download.data)
  const dispatch = useAppDispatch()
  return useCallback(
    async (id: string) => {
      if (data[id] && data[id].abortController) {
        try {
          data[id]?.abortController?.abort()
          dispatch(downloadActions.updateStatus({ id, status: 'canceled' }))
        } catch (error) {}
      }
    },
    [data, dispatch]
  )
}

const controller = new AbortController()
