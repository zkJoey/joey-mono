import { ChainEnum } from './chain'
import BASE_POOL_CONFIG_ABI from '../abis/BasePoolConfig.json'
import BASE_CREDIT_POOL_ABI from '../abis/BaseCreditPool.json'
import HDT_ABI from '../abis/HDT.json'
import { IconType } from '../utilTypes'
import { UsdcIcon } from '../components/icons'

export enum POOL_NAME {
  HumaCreditLine = 'HumaCreditLine',
}

export enum POOL_TYPE {
  CreditLine = 'CreditLine',
}

export type PoolMapType = {
  [poolType in POOL_TYPE]: {
    [poolName: string]: {
      name: string
      borrowDesc: string
      lendDesc: string
    }
  }
}

export type PoolInfoType = {
  basePoolConfig: string
  pool: string
  poolFeeManager: string
  poolUnderlyingToken: {
    address: string
    symbol: string
    decimals: number
    icon: IconType
  }
  assetAddress?: string
  poolName: POOL_NAME
  poolType: POOL_TYPE
  poolAbi: unknown
  basePoolConfigAbi: unknown
  HDT: {
    address: string
    abi: unknown
  }
}

export type PoolContractMapType = {
  [chainId: number]: {
    [POOL_TYPE.CreditLine]: {
      [poolName: string]: PoolInfoType
    }
  }
}

export const PoolMap: PoolMapType = {
  [POOL_TYPE.CreditLine]: {
    [POOL_NAME.HumaCreditLine]: {
      name: 'Huma Credit Line',
      borrowDesc:
        'Credit lines backed by your future crypto income. Only available to the members of partner DAOs during beta.',
      lendDesc:
        'Earn active yield by participating in credit lines backed by on-chain income. Only available to the members of partner DAOs during beta.',
    },
  },
}

export const PoolContractMap: PoolContractMapType = {
  [ChainEnum.Local]: {
    [POOL_TYPE.CreditLine]: {
      [POOL_NAME.HumaCreditLine]: {
        basePoolConfig: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', // TODO: Replace this with the BaseCreditPoolConfig contract address
        pool: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853', // TODO: Replace this with the BaseCreditPool contract address
        poolFeeManager: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // TODO: Replace this with the BaseCreditPoolFeeManager contract address
        poolUnderlyingToken: {
          address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // TODO: Replace this with the USDC contract address
          symbol: 'USDC',
          decimals: 6,
          icon: UsdcIcon,
        },
        poolName: POOL_NAME.HumaCreditLine,
        poolType: POOL_TYPE.CreditLine,
        poolAbi: BASE_CREDIT_POOL_ABI,
        basePoolConfigAbi: BASE_POOL_CONFIG_ABI,
        HDT: {
          address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', // TODO: Replace this with the BaseCreditHDT contract address
          abi: HDT_ABI,
        },
      },
    },
  },
}
