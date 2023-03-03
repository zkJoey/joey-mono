import { Box } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useRef } from 'react'

import { WCProps } from '../utilTypes'

export function Web3ProviderListener({ children }: WCProps) {
  const { account, chainId, provider } = useWeb3React()
  const accountRef = useRef(account)
  const chainIdRef = useRef(chainId)

  const refreshPage = useCallback(() => {
    window.location.reload()
  }, [])

  useEffect(() => {
    if (!provider) return () => undefined
    const chainIdListener = (newChain: { chainId: number }) => {
      if (chainIdRef.current && chainIdRef.current !== newChain.chainId) {
        refreshPage()
      } else {
        chainIdRef.current = newChain.chainId
      }
    }
    provider.on('network', chainIdListener)
    return () => {
      provider.removeListener('network', chainIdListener)
    }
  }, [provider, refreshPage])

  useEffect(() => {
    if (accountRef.current && accountRef.current !== account) {
      refreshPage()
    } else {
      accountRef.current = account
    }
  }, [account, refreshPage])

  return <Box>{children}</Box>
}
