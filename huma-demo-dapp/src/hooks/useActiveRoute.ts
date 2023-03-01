import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { routes } from '../Router'

const useActiveRoute = (): Partial<{
  path: string
  isRoot?: boolean | undefined
}> => {
  const location = useLocation()
  const activeRoute = useMemo(
    () =>
      Object.values(routes).find(
        (route) =>
          !!matchPath(location.pathname, { path: route.path, exact: true }),
      ),
    [location.pathname],
  )

  return activeRoute ?? {}
}

export default useActiveRoute
