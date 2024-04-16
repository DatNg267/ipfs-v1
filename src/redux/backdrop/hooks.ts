import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { backdropActions } from './reducer'

export function useCloseBackDrop(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(backdropActions.close()), [dispatch])
}
export function useOpenBackDrop(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(backdropActions.open()), [dispatch])
}
