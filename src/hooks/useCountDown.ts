import { useState, useEffect, useRef } from 'react'

function useCountdown(time: number) {
  const [countdown, setCountdown] = useState(time)
  const [isRunning, setIsRunning] = useState(false)
  const intervalIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reset = () => {
    setIsRunning(false)
    setCountdown(time)
  }
  const start = () => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }

  const stop = () => {
    if (isRunning) {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setCountdown((countdown) => countdown - 1)
      }, 1000)
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [isRunning])

  useEffect(() => {
    if (countdown === 0) {
      setIsRunning(false)
      setCountdown(time)
    }
  }, [countdown])

  return { isRunning, countdown, start, stop, reset }
}

export default useCountdown
