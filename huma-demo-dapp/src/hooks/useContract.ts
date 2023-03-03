import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

import ERC20_ABI from '../abis/erc20.json'
import TEST_ERC20_ABI from '../abis/TestERC20.json'
import { Erc20, TestERC20 } from '../abis/types'
import { getContract } from '../utils/web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !provider || !chainId) return null
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error(error)
      return null
    }
  }, [address, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useERC20Contract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useTestERC20Contract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
) {
  return useContract<TestERC20>(
    tokenAddress,
    TEST_ERC20_ABI,
    withSignerIfPossible,
  )
}
