import { DASHBOARD_NAVBAR_HREF } from '@/layouts/dashboard/data'
import { colorTheme } from '@/themes/_color'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const usePageColor = () => {
  const router = useRouter()

  return useCallback(() => {
    return (
      DASHBOARD_NAVBAR_HREF.find((i) => router.asPath.includes(i.rawhref))
        ?.color || colorTheme.general.dotCoban[500]
    )
  }, [router])
}
