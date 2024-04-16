import { AppRouter } from '@/constants'
import {
  StatusToken,
  useExpiredToken,
  useUpdateStateLogout,
} from '@/redux/auth/hooks'
import { UserErrorMessage, getError } from '@/utils/error'
import { useRouter } from 'next/router'
import * as qs from 'querystring'
import { useCallback } from 'react'
export function useWrapperFunctionTokenExpired<T, U>(
  fn: (value: T) => Promise<U>
): (value: T) => Promise<U> {
  const router = useRouter()
  const handleCheckExperiedToken = useExpiredToken()
  const handleUpdateStateLogout = useUpdateStateLogout()

  return useCallback(
    async (value: T) => {
      return fn(value)
        .then((res) => {
          return res
        })
        .catch(async (err) => {
          if (getError(err).error.message === UserErrorMessage.INVALID_TOKEN) {
            const resonse = await handleCheckExperiedToken()

            if (resonse === StatusToken.VALID) {
              return fn(value)
                .then((res) => res)
                .catch(async (err) => {
                  const errorMessage = getError(err).error.message
                  if (
                    errorMessage === UserErrorMessage.INVALID_TOKEN ||
                    errorMessage === UserErrorMessage.NOT_LOGGED ||
                    errorMessage === UserErrorMessage.VALIDATE_TOKEN_FAILED
                  ) {
                    handleUpdateStateLogout()
                    await router.push({
                      pathname: AppRouter.LOGIN,
                      query: qs.stringify({
                        pass: router.asPath,
                      }),
                    })
                    throw new Error(UserErrorMessage.AN_ERROR_HAS_OCCURRED)
                  }
                  throw new Error(getError(err).error.message)
                })
            } else {
              throw new Error(getError(err).error.message)
            }
          } else if (
            getError(err).error.message === UserErrorMessage.NOT_LOGGED ||
            getError(err).error.message ===
              UserErrorMessage.VALIDATE_TOKEN_FAILED
          ) {
            handleUpdateStateLogout()
            await router.push({
              pathname: AppRouter.LOGIN,
              query: qs.stringify({
                pass: router.asPath,
              }),
            })
            throw new Error(UserErrorMessage.AN_ERROR_HAS_OCCURRED)
          } else {
            throw new Error(getError(err).error.message)
          }
        })
    },
    [fn, handleCheckExperiedToken, handleUpdateStateLogout, router]
  )
}
