import { Contract, ContractReceipt } from '@ethersproject/contracts'
import {
  TransactionReceipt,
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import create from 'zustand'

import {
  getTransactionErrorFromError,
  getTransactionErrorFromHash,
  increaseGasLimit,
  TxStateType,
} from '../utils/transaction'

interface TxStateManagement {
  state: TxStateType
  txHash: string
  txReceipt: ContractReceipt | undefined
  loading: boolean
  failReason: string
  setState: (state: TxStateType) => void
  reset: () => void
  send: (
    contract: Contract,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: any[],
    provider: Web3Provider | undefined,
  ) => Promise<void>
}

export const useContractFunctionTestUSDC = create<TxStateManagement>((set) => ({
  state: TxStateType.New,
  txHash: '',
  txReceipt: undefined,
  loading: false,
  failReason: '',
  setState: (newState) => set(() => ({ state: newState })),
  reset: () =>
    set({
      state: TxStateType.New,
      txHash: '',
      loading: false,
      failReason: '',
      txReceipt: undefined,
    }),
  send: async (contract, method, parameters, provider) => {
    try {
      set({ state: TxStateType.GasEstimating, loading: true })
      const gasLimit = await contract.estimateGas[method](...parameters)
      set({ state: TxStateType.Signing })
      const tx: TransactionResponse = await contract[method](...parameters, {
        gasLimit: increaseGasLimit(gasLimit),
      })
      set({ state: TxStateType.Confirming })
      set({ txHash: tx.hash })

      const txReceipt: TransactionReceipt = await tx.wait()
      set({ txReceipt })

      // tx was mined successfully
      if (txReceipt.status === 1) {
        set({ state: TxStateType.Success, loading: false })
      } else {
        let failReason = 'Send transaction failed'
        if (provider) {
          const failReasonReturned = await getTransactionErrorFromHash(
            provider,
            tx.hash,
          )
          if (failReasonReturned) {
            failReason = failReasonReturned
          }
        }
        set({ state: TxStateType.Failed, loading: false, failReason })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e)
      const contractErrorMessage = getTransactionErrorFromError(e)
      if (contractErrorMessage) {
        set({
          state: TxStateType.Failed,
          loading: false,
          failReason: contractErrorMessage,
        })
        return
      }

      if (e.code === 4001 || e.code === 'ACTION_REJECTED') {
        set({
          state: TxStateType.Denied,
          loading: false,
          failReason: 'User has rejected the transaction',
        })
        return
      }

      set({
        state: TxStateType.Invalid,
        loading: false,
        failReason: e.reason || `Send transaction failed`,
      })
    }
  },
}))
