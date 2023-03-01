import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ConnectorType, initialWalletState, ProviderType } from './wallet.store'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    setConnectWalletModalOpened: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.isModalOpened = payload
    },
    setChoosenProvider: (state, { payload }: PayloadAction<ProviderType>) => {
      state.choosenProvider = payload
    },
    setIsConnecting: (state, { payload }: PayloadAction<boolean>) => {
      state.isConnecting = payload
    },
    setError: (state, { payload }: PayloadAction<Error | undefined>) => {
      state.error = payload
    },
    setConnector: (
      state,
      {
        payload,
      }: PayloadAction<{ provider: string; connector: ConnectorType }>,
    ) => {
      state.connectors[payload.provider] = payload.connector
    },
  },
})

export const {
  setConnectWalletModalOpened,
  setChoosenProvider,
  setIsConnecting,
  setError,
  setConnector,
} = walletSlice.actions

export default walletSlice.reducer
