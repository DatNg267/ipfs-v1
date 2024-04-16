import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { modalReviewFileActions } from '.'

export function useUpdateFileInfo(): ({
  cid,
  name,
  size,
}: {
  cid: string
  name: string
  size: number
}) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    ({ cid, name, size }: { cid: string; name: string; size: number }) =>
      dispatch(
        modalReviewFileActions.updateFileInfo({
          cid,
          name,
          size,
        })
      ),
    [dispatch]
  )
}
