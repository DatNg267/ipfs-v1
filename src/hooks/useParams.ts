import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useParams = () => {
  const router = useRouter()
  const rawParams = {
    ...router.query,
  }

  const getParams = useCallback(
    <T extends Record<string, unknown>, K extends keyof T>(
      obj: {
        [key: string]: any
      },
      keys: K[]
    ): T => {
      let resObj = {} as T
      keys.forEach((element) => {
        if (obj[element as string] !== undefined) {
          resObj[element as keyof T] = obj[element as string] as T[keyof T]
        }
      })
      return resObj
    },
    []
  )
  const handleChangeParams = useCallback(
    debounce((params: any, isReplace: boolean = false) => {
      try {
        if (!isReplace) {
          router.replace(
            {
              pathname: router.pathname,
              ...(params && {
                query: { ...router.query, ...params },
              }),
            },
            undefined,
            { shallow: true }
          )
        } else {
          router.replace(
            {
              pathname: router.pathname,
              ...(params && {
                query: { ...params },
              }),
            },
            undefined,
            { shallow: true }
          )
        }
      } catch (error) {}
    }, 200),
    [router]
  )
  const handleSort = useCallback(
    debounce((params: any, isReplace: boolean = false) => {
      try {
        if (!isReplace) {
          router.replace(
            {
              pathname: router.pathname,
              ...(params && {
                query: { ...router.query, ...params },
              }),
            },
            undefined,
            { shallow: true }
          )
        } else {
          router.replace(
            {
              pathname: router.pathname,
              ...(params && {
                query: { ...params },
              }),
            },
            undefined,
            { shallow: true }
          )
        }
      } catch (error) {}
    }, 200),
    [router]
  )
  const handleSearch = useCallback(
    debounce((value: string) => {
      try {
        router.replace(
          {
            pathname: router.pathname,
            ...(value && {
              query: { ...router.query, search: value },
            }),
          },
          undefined,
          { shallow: true }
        )
      } catch (error) {}
    }, 200),
    [router]
  )
  const onChangePage = useCallback(
    debounce((page: number, page_size: number) => {
      try {
        router.replace(
          {
            pathname: router.pathname,
            ...(page >= 0 && {
              query: { ...router.query, page: page },
            }),
          },
          undefined,
          { shallow: true }
        )
      } catch (error) {}
    }, 200),
    [router]
  )
  return {
    router,
    getParams,
    rawParams,
    handleChangeParams,
    handleSearch,
    handleSort,
    onChangePage,
  }
}

export default useParams
