import { debounce } from 'lodash'
import React, { useEffect } from 'react'

type Props = {
  func: any
}

const useWindowResize = ({ func }: Props) => {
  useEffect(() => {
    const handleWindowResize = debounce(() => {
      func()
    }, 200)
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [func])
}

export default useWindowResize
