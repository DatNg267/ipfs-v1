import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useCurrentPage = () => {
  const router = useRouter()
  const getPage = useCallback(() => {
    try {
      return router.query.page ? parseInt(router.query.page?.toString()) : 1
    } catch (error) {
      return 1
    }
  }, [router])
  const page = getPage() || 1
  return page
}
