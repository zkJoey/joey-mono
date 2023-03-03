import { JsonRpcSigner } from '@ethersproject/providers'
import create from 'zustand'

import { toBigNumber } from '../utils/number'
import { increaseGasLimit, TxResponse, TxStateType } from '../utils/transaction'

export type TxData = {
  valueToSend: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  to: string
}

interface TxStateManagement {
  state: TxStateType
  setState: (state: TxStateType) => void
  txHash: string
  clearTxHash: () => void
  sendTransaction: (
    signer: JsonRpcSigner,
    transactionData: TxData,
  ) => Promise<TxResponse | undefined>
}

export const useSendTransaction = create<TxStateManagement>((set) => ({
  state: TxStateType.New,
  txHash: '',
  clearTxHash: () => set({ txHash: '' }),
  setState: (newState) => set(() => ({ state: newState })),
  // eslint-disable-next-line consistent-return
  sendTransaction: async (signer, transactionData) => {
    try {
      const txNoGasLimit = {
        to: transactionData.to,
        value: toBigNumber(transactionData.valueToSend),
        data: transactionData.data,
      }

      const gasLimit = await signer.estimateGas(txNoGasLimit)
      const tx = { ...txNoGasLimit, gasLimit: increaseGasLimit(gasLimit) }

      set({ state: TxStateType.Signing })
      const res = await signer.sendTransaction(tx)
      set({ state: TxStateType.Confirming })
      set({ txHash: res.hash })

      const txReceipt = await res.wait()

      // tx was mined successfully
      if (txReceipt.status === 1) {
        set({ state: TxStateType.Success })
        return {
          txReceipt,
        }
      }
      set({ state: TxStateType.Failed })
      return {
        txReceipt,
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      if (error.code === 4001) {
        set({ state: TxStateType.Denied })
      } else {
        set({ state: TxStateType.Invalid })
      }
    }
  },
}))
