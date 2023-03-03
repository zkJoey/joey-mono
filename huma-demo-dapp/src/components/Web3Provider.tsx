import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { useMemo } from 'react'

import { connectors } from '../features/wallet/connectors'
import { WCProps } from '../utilTypes'

export function Web3Provider({ children }: WCProps) {
  const connectorsFormatted: [Connector, Web3ReactHooks][] = Object.values(
    connectors,
  ).map(({ hooks, connector }) => [connector, hooks])

  const key = useMemo(
    () =>
      Object.keys(connectors)
        .map((connectorName) => connectorName)
        .join('-'),
    [],
  )

  return (
    <Web3ReactProvider connectors={connectorsFormatted} key={key}>
      {children}
    </Web3ReactProvider>
  )
}
