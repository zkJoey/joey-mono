import { Web3ReactHooks } from '@web3-react/core'
import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import {
  setChoosenProvider,
  setConnector,
  setConnectWalletModalOpened,
  setError,
  setIsConnecting,
} from '../store/wallet.reducers'
import { selectWalletState } from '../store/wallet.selectors'
import { ConnectorType, ProviderType } from '../store/wallet.store'

type UseConnectType = {
  connect: () => void
}

export function useConnect(
  connector: ConnectorType,
  hooks: Web3ReactHooks,
  providerType: ProviderType,
): UseConnectType {
  const dispatch = useAppDispatch()
  const { choosenProvider } = useAppSelector(selectWalletState)
  const { useIsActive } = hooks
  const isActive = useIsActive()

  useEffect(() => {
    connector.connectEagerly().catch(() => {
      console.debug(`Failed to connect eagerly to ${providerType}`)
    })
  }, [connector, providerType])

  useEffect(() => {
    if (isActive && !choosenProvider) {
      dispatch(setChoosenProvider(providerType))
    }
  }, [isActive, choosenProvider, dispatch, providerType])

  useEffect(() => {
    dispatch(setConnector({ provider: providerType, connector }))
  }, [dispatch, providerType, connector])

  const connect = useCallback(
    (desiredChainId?: number) => {
      dispatch(setChoosenProvider(providerType))
      if (isActive) {
        dispatch(setConnectWalletModalOpened(false))
      } else {
        dispatch(setIsConnecting(true))
        connector
          .activate(desiredChainId)
          .then((e) => {
            console.log(e)
            dispatch(setConnectWalletModalOpened(false))
            dispatch(setError(undefined))
            dispatch(setIsConnecting(false))
          })
          .catch((e) => {
            console.log(e)
            dispatch(setError(e))
            dispatch(setIsConnecting(false))
          })
      }
    },
    [isActive, dispatch, providerType, connector],
  )

  return {
    connect,
  }
}
