import { useCallback } from 'react'
import { useAppDispatch } from '../hooks'
import { ScreenType, appActions } from './reducer'

export function useSetScreen(): (screen: ScreenType) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (screen: ScreenType) => dispatch(appActions.setScreenType(screen)),
    [dispatch]
  )
}

export function useOpenNavbar(): (open: boolean) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (open: boolean) => {
      let body = document.querySelector('body')
      // if (body) {
      //   if (open) {
      //     body.style.overflow = 'hidden'
      //   } else {
      //     body.style.overflow = 'unset'
      //   }
      // }
      dispatch(appActions.openNavbar(open))
    },
    [dispatch]
  )
}

export function useUpdateDashboardHeaderHeight(): (height: number) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (height: number) =>
      dispatch(appActions.useUpdateDashboardHeaderHeight(height)),
    [dispatch]
  )
}
