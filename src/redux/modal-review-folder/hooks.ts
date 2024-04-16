import { useAppDispatch } from '@/redux/hooks'
import { modalReviewFolderActions } from '.'
import { useCallback } from 'react'
import { IPFSGetFolderResponse } from '@/apis/ipfs/type'

export function useResetReviewFolder(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(
    () => dispatch(modalReviewFolderActions.reset()),
    [dispatch]
  )
}
export function useSetFolder(): (folder: IPFSGetFolderResponse | null) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (folder: IPFSGetFolderResponse | null) =>
      dispatch(modalReviewFolderActions.setFolder(folder)),
    [dispatch]
  )
}
export function useChangeIndexFileTarget(): (index: number) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (index: number) =>
      dispatch(modalReviewFolderActions.setIndexFileTarget(index)),
    [dispatch]
  )
}

export function useChangeIsReviewFileDataTab(): (
  isReviewFileDataTab: boolean
) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (isReviewFileDataTab: boolean) =>
      dispatch(
        modalReviewFolderActions.setIsReviewFileDataTab(isReviewFileDataTab)
      ),
    [dispatch]
  )
}
export function useUpdateFolderInfo(): ({
  cid,
  folderName,
  folderSize,
}: {
  cid: string
  folderName: string
  folderSize: number
}) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    ({
      cid,
      folderName,
      folderSize,
    }: {
      cid: string
      folderName: string
      folderSize: number
    }) =>
      dispatch(
        modalReviewFolderActions.updateFolderInfo({
          cid,
          name: folderName,
          size: folderSize,
        })
      ),
    [dispatch]
  )
}
export const getSumSize = (sizes: IPFSGetFolderResponse['Links']) => {
  let sum = 0
  sizes.forEach((element) => {
    sum = sum + element.Tsize
  })
  return sum
}
