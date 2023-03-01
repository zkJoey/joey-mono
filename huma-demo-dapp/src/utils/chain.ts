import type { AddEthereumChainParameter } from '@web3-react/types'
import { EthereumIcon } from '../components/icons'
import { IconType } from '../utilTypes'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
  icon: IconType
  wait: number
  requestAPIUrl?: string | undefined
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

export enum ChainEnum {
  Local = 31337,
}

export const SupportedChainIds = [ChainEnum.Local]

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
  [ChainEnum.Local]: {
    urls: ['http://localhost:8545'],
    name: 'Local Hardhat',
    nativeCurrency: ETH,
    icon: EthereumIcon,
    wait: 1,
  },
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
  chainId: number,
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
    }
  }
  return chainId
}

export const getWalletAddressAbbr = (address: string) => {
  if (!address) {
    return address
  }
  const { length } = address
  return `${address.slice(0, 6)}...${address.slice(length - 4, length)}`
}
