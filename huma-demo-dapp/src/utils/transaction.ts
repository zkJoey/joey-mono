import { BigNumber } from '@ethersproject/bignumber'
import { ContractReceipt } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import TxErrors from './contractError.json'
import { capitalizeFirstLetter } from './string'

export enum TxStateType {
  Success = 'Success',
  Denied = 'Denied',
  Invalid = 'Invalid',
  Failed = 'Failed',
  New = 'New',
  GasEstimating = 'GasEstimating',
  Signing = 'Signing',
  Confirming = 'Confirming',
}

export interface TxResponse {
  txReceipt: ContractReceipt
}

export interface Event {
  name: string
  type: string
  value: string
}

export interface EventLog {
  name: string
  events: Event[]
  address: string
}

export const isTxFailed = (txState: TxStateType) =>
  [TxStateType.Denied, TxStateType.Invalid, TxStateType.Failed].includes(
    txState,
  )

export const increaseGasLimit = (estimatedGasLimit: BigNumber) => {
  if (!estimatedGasLimit || Number.isNaN(estimatedGasLimit.toNumber())) {
    console.log('estimatedGasLimit', estimatedGasLimit)
    throw new Error('Estimated gas limited error.')
  }
  return estimatedGasLimit.mul(150).div(100)
}

const parseErrorMessageToUserFriendlyMessage = (message: string) =>
  capitalizeFirstLetter(
    message
      .replace('()', '')
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase(),
  )

const findContractErrorMessage = (code: string): string | null => {
  let reason: string | null = null
  Object.keys(TxErrors).forEach((key) => {
    // @ts-ignore
    if (code.toLowerCase() === TxErrors[key].toLowerCase()) {
      reason = parseErrorMessageToUserFriendlyMessage(key)
    }
  })
  return reason
}

export const getTransactionErrorFromHash = async (
  provider: Web3Provider,
  txHash: string,
): Promise<string> => {
  const commonErrorMessage = 'Send transaction failed'
  try {
    const originTx = await provider.getTransaction(txHash)
    const { from, to, data, gasLimit, blockNumber } = originTx
    // Only provide necessary params to get the tx return which can avoid unexpected error
    const tx = { from, to, data, gasLimit }
    const code = await provider.call(tx, blockNumber)
    const reason = findContractErrorMessage(code)
    return reason ?? commonErrorMessage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (!error.data) {
      console.error(error)
      return commonErrorMessage
    }
    const code = error.data.replace('Reverted ', '')
    const reason = ethers.utils.toUtf8String(`0x${code.substr(138)}`)
    console.error(error)
    return reason
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTransactionErrorFromError = (e: any) => {
  const errorCode = e.error?.data?.originalError?.data
  if (errorCode) {
    const contractErrorMessage = findContractErrorMessage(errorCode)
    if (contractErrorMessage) {
      return contractErrorMessage
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decodeLogs = (txlogs: any[], abi: any) => {
  const result: ethers.utils.LogDescription[] = []
  const iface = new ethers.utils.Interface(abi)
  // eslint-disable-next-line no-restricted-syntax
  for (const log of txlogs) {
    try {
      result.push(iface.parseLog(log))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
    }
  }
  return result
}
