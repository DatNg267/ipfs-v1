import { useCallback } from 'react'
import {
  ApplicationModal,
  putProps,
  setCloseModal,
  setOpenModal,
} from './reducer'
import { useAppDispatch } from '../hooks'

export function useCloseModal(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    // const body = document.querySelector('body')
    // body.style.overflowY = 'unset'
    dispatch(setCloseModal())
  }, [dispatch])
}
export function useOpenModal(modal: ApplicationModal, props?: any): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    if (props) {
      dispatch(putProps(props))
    }
    // const body = document.querySelector('body')
    // body.style.overflowY = 'hidden'
    dispatch(setOpenModal(modal))
  }, [dispatch, modal, props])
}
