import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { WCProps } from '../utilTypes'

const NotFound = lazy(() => import('./NotFound'))

type Props = {
  /**
   * Either displays the 404 page on the current route,
   * or, if redirect is true, redirects to the 404 url
   */
  redirect?: boolean
}

export function Switch404({
  children,
  redirect = false,
}: WCProps<Props>): React.ReactElement {
  return (
    <Switch>
      {children}
      {redirect && <Redirect to='/404' />}
      <Route component={NotFound} path='*' />
    </Switch>
  )
}
