import { TypeGateway } from '@/apis/gateway/type'
import { SortOrder } from '@/types'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useGetSearchParams = () => {
  const router = useRouter()
  const getSortBy = useCallback(<T>() => {
    return router.query.sortBy?.toString() as T | undefined
  }, [router])
  const getSortOrder = useCallback(() => {
    return router.query.sortOrder?.toString() as SortOrder | undefined
  }, [router])
  const getPage = useCallback(() => {
    return router.query.page ? parseInt(router.query.page?.toString()) : 1
  }, [router])
  const getTypeGateway = useCallback(() => {
    return router.query.type
      ? (router.query.type?.toString() as TypeGateway)
      : undefined
  }, [router])
  return { getSortBy, getSortOrder, getPage, getTypeGateway }
}
