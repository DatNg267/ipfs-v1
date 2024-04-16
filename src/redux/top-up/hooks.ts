import { TopUpUsages } from '@/types/billing'
import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { topUpUsageActions } from './reducer'

export const useUpdateTopUpUsages = (): ((
  histories: TopUpUsages | null
) => void) => {
  const dispath = useAppDispatch()

  return useCallback(
    (histories: TopUpUsages | null) =>
      dispath(topUpUsageActions.updateHistory(histories)),
    [dispath]
  )
}
