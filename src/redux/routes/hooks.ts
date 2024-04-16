import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { RouterStatus, setStatus } from './reducer'

export function useSetStatusRouter(): (status: RouterStatus) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (status: RouterStatus) => dispatch(setStatus(status)),
    [dispatch]
  )
}
