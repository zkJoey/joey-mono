import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { Switch404 } from './components/Switch404'
import { BorrowPools, CreditLine } from './features/borrow/components'
import { LendPools } from './features/lend/components'

export const routes: {
  [page: string]: {
    path: string
    isRoot?: boolean
    component: () => React.ReactElement
  }
} = {
  borrow: {
    path: '/borrow',
    component: BorrowPools,
    isRoot: true,
  },
  borrowCreditLine: {
    path: '/borrow/credit-line',
    component: CreditLine,
  },
  lend: {
    path: '/lend',
    component: LendPools,
    isRoot: true,
  },
}

function Router() {
  return (
    <Switch404>
      {Object.values(routes).map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={route.component}
        />
      ))}
      <Route exact path='/' render={() => <Redirect to='/borrow' />} />
    </Switch404>
  )
}

export default Router
