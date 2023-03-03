import React, { PureComponent } from 'react'
import { createBrowserHistory } from 'history'

import { WCProps } from '../../utilTypes'
import { Error500 } from './Error500'

type PpErrorBoundary = WCProps<{
  fallback?: React.ReactElement
}>

type StErrorBoundary = {
  hasError: boolean
}

export class ErrorBoundary extends PureComponent<
  PpErrorBoundary,
  StErrorBoundary
> {
  static getDerivedStateFromError(): StErrorBoundary {
    return { hasError: true }
  }

  constructor(props: PpErrorBoundary) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidMount(): void {
    const history = createBrowserHistory()
    history.listen(() => {
      this.setState({ hasError: false })
    })
  }

  render(): React.ReactNode {
    const { hasError } = this.state
    const { children, fallback } = this.props
    if (hasError) {
      return fallback || <Error500 fullScreen />
    }
    return children
  }
}
