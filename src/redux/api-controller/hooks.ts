import { CancelTokenSource } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { cancelProgressActions } from './reducer'

export const useUpdateCurrentProgress = (): ((
  source: CancelTokenSource | null
) => void) => {
  const dispath = useAppDispatch()
  return useCallback(
    (source: CancelTokenSource | null) =>
      dispath(cancelProgressActions.updateCurrentProgress(source)),
    [dispath]
  )
}

export const useResetCurrentProgress = (): (() => void) => {
  const dispath = useAppDispatch()
  return useCallback(() => dispath(cancelProgressActions.reset()), [dispath])
}
export const useCancelProgress = (): (() => void) => {
  const { source } = useAppSelector((state) => state.cancelProgress)
  const dispath = useAppDispatch()
  return useCallback(() => {
    if (source) {
      source?.cancel()
      dispath(cancelProgressActions.reset())
    }
  }, [dispath, source])
}

export const usePreventNavigate = () => {
  const handleCancelProgress = useCancelProgress()
  const { source } = useAppSelector((state) => state.cancelProgress)
  const [on, setOn] = useState(false)
  const turnOn = () => setOn(true)
  const turnOff = () => setOn(false)

  useEffect(() => {
    if (on) {
      var Anchors = document.getElementsByTagName('a')
      for (var i = 0; i < Anchors.length; i++) {
        Anchors[i].addEventListener(
          'click',
          function (event) {
            event.preventDefault()
            if (source) {
              if (confirm('If you move, current progress will be canceled?')) {
                handleCancelProgress()
                window.location = this.href
              }
            }
          },
          false
        )
      }
    }
    return () => {
      var Anchors = document.getElementsByTagName('a')
      for (var i = 0; i < Anchors.length; i++) {
        Anchors[i].removeEventListener('click', () => {})
      }
    }
  }, [on, source])

  return { on, turnOn, turnOff }
}
