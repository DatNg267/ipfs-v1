import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { uploadWrapperAnimateLoadingActions } from './reducer'

export function useStartAnimateLoading(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(
    () => dispatch(uploadWrapperAnimateLoadingActions.start()),
    [dispatch]
  )
}

export function useStopAnimateLoading(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(
    () => dispatch(uploadWrapperAnimateLoadingActions.stop()),
    [dispatch]
  )
}
