import { useState } from 'react'

type Props = {}

export const useImageLoader = () => {
  const [error, setError] = useState<any>(false)
  const [success, setSuccess] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const handleError = (err: any) => {
    setError(err)
    setRetryCount((prev) => prev + 1)
  }
  const handleSuccess = () => setSuccess(true)

  return { error, success, retryCount, handleError, handleSuccess }
}
