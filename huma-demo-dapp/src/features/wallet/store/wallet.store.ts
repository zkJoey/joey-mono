import { MetaMask } from '@web3-react/metamask'

import { MetamaskIcon } from '../../../components/icons'
import { IconType } from '../../../utilTypes'

export type ConnectorType = MetaMask
export type ProviderType = 'MetaMask'

export const ProviderInfos: {
  [x: string]: {
    icon: IconType
  }
} = {
  MetaMask: {
    icon: MetamaskIcon,
  },
}

export type WalletState = {
  isModalOpened: boolean
  choosenProvider?: ProviderType
  isConnecting?: boolean
  error?: Error
  connectors: {
    [provider: string]: ConnectorType
  }
}

export const initialWalletState: WalletState = {
  isModalOpened: false,
  connectors: {},
}
