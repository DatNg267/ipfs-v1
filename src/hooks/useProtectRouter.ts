import {
  AppRouter,
  PREVENT_ROUTERS_WHEN_LOGGED,
  PUBLIC_ROUTERS,
} from '@/constants'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useCheckPermissionAndRouterValid = () => {
  const router = useRouter()

  return useCallback(
    async (isLogged: boolean) => {
      const asPath = router.asPath
      if (!isLogged) {
        let isPublicRouter =
          asPath === AppRouter.HOME
            ? true
            : PUBLIC_ROUTERS.findIndex(
                (element) =>
                  element !== AppRouter.HOME && asPath.includes(element)
              ) >= 0

        if (!isPublicRouter) {
          return false
        }
      } else {
        let isInValidRouterWhenLogged =
          PREVENT_ROUTERS_WHEN_LOGGED.findIndex((element) =>
            asPath.includes(element)
          ) >= 0
        if (isInValidRouterWhenLogged) {
          return false
        }
      }
      return true
    },
    [router.asPath]
  )
}
