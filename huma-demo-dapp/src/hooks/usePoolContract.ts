import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import BASE_FEE_MANAGER_ABI from '../abis/BaseFeeManager.json'
import { BaseCreditPool, BasePoolConfig, HDT } from '../abis/types'
import { BaseFeeManager } from '../abis/types/BaseFeeManager'
import { CreditState } from '../utils/credit'
import { downScale, toBigNumber, upScale } from '../utils/number'
import { POOL_NAME, POOL_TYPE, PoolContractMap } from '../utils/pool'
import { useContract, useERC20Contract } from './useContract'
import useForceRefresh from './useForceRefresh'
import { usePoolInfo } from './usePool'

export type CreditRecordType = {
  unbilledPrincipal: BigNumber
  dueDate: BigNumber
  correction: BigNumber
  totalDue: BigNumber
  feesAndInterestDue: BigNumber
  missedPeriods: number
  remainingPeriods: number
  state: number
}

export type CreditRecordStaticType = {
  creditLimit: BigNumber
  aprInBps: number
  intervalInDays: number
  defaultAmount: BigNumber
}

export type FeesType = {
  _frontLoadingFeeFlat: BigNumber
  _frontLoadingFeeBps: BigNumber
  _lateFeeFlat: BigNumber
  _lateFeeBps: BigNumber
  _membershipFee: BigNumber
}

export type AccountStats = {
  creditRecord: CreditRecordType | undefined
  creditRecordStatic: CreditRecordStaticType | undefined
  isApproved: boolean
  payoffAmount: number
  principalAmount: number
  creditAvailableAmount: number
  totalDueAmount: number
}

export function usePoolContract<T extends Contract>(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  return useContract<T>(poolInfo?.pool, poolInfo?.poolAbi)
}

export function useBaseConfigPoolContract<T extends Contract>(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  return useContract<T>(poolInfo?.basePoolConfig, poolInfo?.basePoolConfigAbi)
}

export function usePoolFeeManagerContract(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  return useContract<BaseFeeManager>(
    poolInfo?.poolFeeManager,
    BASE_FEE_MANAGER_ABI,
  )
}

export function usePoolUnderlyingTokenContract(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  return useERC20Contract(poolInfo?.poolUnderlyingToken?.address)
}

export function useHDTContract<T extends Contract>(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  return useContract<T>(poolInfo?.HDT?.address, poolInfo?.HDT?.abi)
}

export function usePoolUnderlyingToken(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
): Partial<{
  address: string
  symbol: string
  decimals: number
}> {
  const poolInfo = usePoolInfo(poolName, poolType)
  return poolInfo?.poolUnderlyingToken || {}
}

export function usePoolUnderlyingTokenBalance(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
) {
  const poolUnderlyingTokenContract = usePoolUnderlyingTokenContract(
    poolName,
    poolType,
  )
  const [balance, setBalance] = useState<BigNumber>(toBigNumber(0))

  useEffect(() => {
    const fetchData = async () => {
      if (poolUnderlyingTokenContract && account) {
        const result = await poolUnderlyingTokenContract.balanceOf(account)
        setBalance(result)
      }
    }
    fetchData()
  }, [account, poolUnderlyingTokenContract])

  return balance
}

export function usePoolBalance(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
): [BigNumber | undefined, () => void] {
  const poolUnderlyingTokenContract = usePoolUnderlyingTokenContract(
    poolName,
    poolType,
  )
  const { chainId } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>()
  const [refreshCount, refresh] = useForceRefresh()

  useEffect(() => {
    const fetchData = async () => {
      if (chainId && poolUnderlyingTokenContract) {
        const { pool } = PoolContractMap[chainId][poolType][poolName]
        const result = await poolUnderlyingTokenContract.balanceOf(pool)
        setBalance(result)
      }
    }
    fetchData()
  }, [chainId, poolName, poolType, poolUnderlyingTokenContract, refreshCount])

  return [balance, refresh]
}

export function useAccountStats(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
): [AccountStats, () => void] {
  const poolInfo = usePoolInfo(poolName, poolType)
  const poolContract = usePoolContract<BaseCreditPool>(poolName, poolType)
  const [accountStats, setAccountStats] = useState<AccountStats>({
    creditRecord: undefined,
    creditRecordStatic: undefined,
    isApproved: false,
    payoffAmount: 0,
    principalAmount: 0,
    creditAvailableAmount: 0,
    totalDueAmount: 0,
  })
  const [refreshCount, refresh] = useForceRefresh()

  useEffect(() => {
    const fetchData = async () => {
      if (poolContract && account && poolInfo) {
        const creditRecord = await poolContract.creditRecordMapping(account)
        const creditRecordStatic = await poolContract.creditRecordStaticMapping(
          account,
        )
        const isApproved = creditRecord
          ? creditRecord.state >= CreditState.Approved
          : false

        const payoffWithoutCorrection = creditRecord.unbilledPrincipal.add(
          creditRecord.totalDue,
        )
        const payoff = payoffWithoutCorrection.add(creditRecord.correction)
        const principal = payoffWithoutCorrection.sub(
          creditRecord.feesAndInterestDue,
        )
        const creditAvailable = creditRecordStatic.creditLimit.sub(principal)

        const { decimals } = poolInfo.poolUnderlyingToken
        setAccountStats({
          creditRecord,
          creditRecordStatic,
          isApproved,
          payoffAmount: downScale<number>(payoff.toNumber(), decimals),
          principalAmount: downScale<number>(principal.toNumber(), decimals),
          creditAvailableAmount: downScale<number>(
            creditAvailable.toNumber(),
            decimals,
          ),
          totalDueAmount: downScale<number>(
            creditRecord.totalDue.toNumber(),
            decimals,
          ),
        })
      }
    }
    fetchData()
  }, [account, poolContract, poolInfo, refreshCount])

  return [accountStats, refresh]
}

export function useCreditRecord(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
) {
  const poolContract = usePoolContract<BaseCreditPool>(poolName, poolType)

  const checkIsApproved = useCallback(async () => {
    if (poolContract && account) {
      const creditRecord = await poolContract.creditRecordMapping(account)
      const isApproved = creditRecord
        ? creditRecord.state >= CreditState.Approved
        : false
      return isApproved
    }
    return false
  }, [account, poolContract])

  return { checkIsApproved }
}

export function useFeeManager(poolName: POOL_NAME, poolType: POOL_TYPE) {
  const poolInfo = usePoolInfo(poolName, poolType)
  const feeManagerContract = usePoolFeeManagerContract(poolName, poolType)
  const [fees, setFees] = useState<FeesType>()

  useEffect(() => {
    const fetchData = async () => {
      if (feeManagerContract) {
        const result = await feeManagerContract.getFees()
        setFees(result)
      }
    }
    fetchData()
  }, [feeManagerContract])

  /**
   * return fees charged without decimals
   */
  const getFeesCharged = useCallback(
    (requestedLoan: number) => {
      if (!fees || !requestedLoan || !poolInfo) {
        return 0
      }
      const { poolUnderlyingToken } = poolInfo
      const { decimals } = poolUnderlyingToken
      const { _frontLoadingFeeFlat: feeFlat, _frontLoadingFeeBps: feeBps } =
        fees

      // @TODO: Figure out why feeBps.div(10000) directly not work
      return feeBps
        .div(100)
        .mul(requestedLoan)
        .div(100)
        .add(downScale(feeFlat.toNumber(), decimals))
        .toNumber()
    },
    [fees, poolInfo],
  )

  return { fees, getFeesCharged }
}

export function usePoolAllowance(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
) {
  const poolInfo = usePoolInfo(poolName, poolType)
  const contract = usePoolUnderlyingTokenContract(poolName, poolType)
  const [allowance, setAllowance] = useState<BigNumber>(toBigNumber(0))
  const [approved, setApproved] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (contract && poolInfo && account) {
        const allowance = await contract.allowance(account, poolInfo.pool)
        setAllowance(allowance)
        setApproved(allowance.gt(MaxUint256.div(2)))
      }
    }
    fetchData()
  }, [account, contract, poolInfo])

  return { approved, allowance }
}

export function useLenderPosition(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
): [BigNumber | undefined, () => void] {
  const poolInfo = usePoolInfo(poolName, poolType)
  const contract = useHDTContract<HDT>(poolName, poolType)
  const [position, setPosition] = useState<BigNumber>()
  const [refreshCount, refresh] = useForceRefresh()

  useEffect(() => {
    const fetchData = async () => {
      if (contract && account && poolInfo) {
        const position = await contract.withdrawableFundsOf(account)
        const oneCentUSD = BigNumber.from(
          upScale(0.01, poolInfo.poolUnderlyingToken.decimals),
        )
        // if position is less than one cent USD, consider it 0
        if (position.lt(oneCentUSD)) {
          setPosition(BigNumber.from(0))
        } else {
          setPosition(position)
        }
      }
    }
    fetchData()
  }, [account, contract, poolInfo, refreshCount])

  return [position, refresh]
}

export function useLenderApproved(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
): [boolean | undefined, () => void] {
  const contract = usePoolContract<BaseCreditPool>(poolName, poolType)
  const [approved, setApproved] = useState<boolean>()
  const [refreshCount, refresh] = useForceRefresh()

  useEffect(() => {
    const fetchData = async () => {
      if (contract && account) {
        const approved = await contract.isApprovedLender(account)
        setApproved(approved)
      }
    }
    fetchData()
  }, [account, contract, refreshCount])

  return [approved, refresh]
}

export function useWithdrawlLockoutInSeconds(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
) {
  const contract = useBaseConfigPoolContract<BasePoolConfig>(poolName, poolType)
  const [lockoutSeconds, setLockoutSeconds] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        const seconds = await contract.withdrawalLockoutPeriodInSeconds()
        setLockoutSeconds(seconds.toNumber())
      }
    }
    fetchData()
  }, [contract])

  return lockoutSeconds
}

export function useLastDepositTime(
  poolName: POOL_NAME,
  poolType: POOL_TYPE,
  account?: string,
) {
  const contract = usePoolContract<BaseCreditPool>(poolName, poolType)
  const [lockoutSeconds, setLockoutSeconds] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      if (contract && account) {
        const seconds = await contract.lastDepositTime(account)
        setLockoutSeconds(seconds.toNumber())
      }
    }
    fetchData()
  }, [account, contract])

  return lockoutSeconds
}
