import {
  Action,
  ActionCreator,
  AnyAction,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'

import appReducers from './app/store/app.reducers'
import walletReducers from './features/wallet/store/wallet.reducers'
import borrowReducers from './features/borrow/store/borrow.reducers'
import creditLineReducers from './features/sdk/CreditLine/store/creditLine.reducers'
import lendReducers from './features/sdk/Lend/store/lend.reducers'

export const store = configureStore({
  reducer: {
    app: appReducers,
    wallet: walletReducers,
    borrow: borrowReducers,
    creditLine: creditLineReducers,
    lend: lendReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['wallet/setConnector'],
        ignoredPaths: ['wallet.connectors.MetaMask'],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppActionThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, AnyAction>
>
