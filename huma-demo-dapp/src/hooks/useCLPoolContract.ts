import { BaseCreditPool } from '../abis/types/BaseCreditPool'
import { POOL_NAME, POOL_TYPE } from '../utils/pool'
import {
  useAccountStats,
  useBaseConfigPoolContract,
  useCreditRecord,
  useFeeManager,
  useLenderApproved,
  useLenderPosition,
  usePoolAllowance,
  usePoolBalance,
  usePoolContract,
  usePoolUnderlyingToken,
  usePoolUnderlyingTokenBalance,
  usePoolUnderlyingTokenContract,
} from './usePoolContract'

export function useCLPoolContract(poolName: POOL_NAME) {
  return usePoolContract<BaseCreditPool>(poolName, POOL_TYPE.CreditLine)
}

export function useCLBaseConfigPoolContract(poolName: POOL_NAME) {
  return useBaseConfigPoolContract<BaseCreditPool>(
    poolName,
    POOL_TYPE.CreditLine,
  )
}

export function useCLPoolUnderlyingTokenContract(poolName: POOL_NAME) {
  return usePoolUnderlyingTokenContract(poolName, POOL_TYPE.CreditLine)
}

export function useCLPoolUnderlyingToken(poolName: POOL_NAME) {
  return usePoolUnderlyingToken(poolName, POOL_TYPE.CreditLine)
}

export function useCLPoolUnderlyingTokenBalance(
  poolName: POOL_NAME,
  account?: string,
) {
  return usePoolUnderlyingTokenBalance(poolName, POOL_TYPE.CreditLine, account)
}

export function useCLPoolBalance(poolName: POOL_NAME) {
  return usePoolBalance(poolName, POOL_TYPE.CreditLine)
}

export function useCLStats(poolName: POOL_NAME, account?: string) {
  return useAccountStats(poolName, POOL_TYPE.CreditLine, account)
}

export function useCLCreditRecord(poolName: POOL_NAME, account?: string) {
  return useCreditRecord(poolName, POOL_TYPE.CreditLine, account)
}

export function useCLFeeManager(poolName: POOL_NAME) {
  return useFeeManager(poolName, POOL_TYPE.CreditLine)
}

export function useCLPoolAllowance(poolName: POOL_NAME, account?: string) {
  return usePoolAllowance(poolName, POOL_TYPE.CreditLine, account)
}

export function useCLLenderPosition(poolName: POOL_NAME, account?: string) {
  return useLenderPosition(poolName, POOL_TYPE.CreditLine, account)
}

export function useCLLenderApproved(poolName: POOL_NAME, account?: string) {
  return useLenderApproved(poolName, POOL_TYPE.CreditLine, account)
}
