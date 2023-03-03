import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import React from 'react'

import {
  usePoolAllowance,
  usePoolUnderlyingTokenBalance,
  useWithdrawlLockoutInSeconds,
} from '../../../../hooks/usePoolContract'
import { PoolInfoType } from '../../../../utils/pool'
import { Supply } from './supply/Supply'
import { Withdraw } from './withdraw/Withdraw'

type Props = {
  lenderPosition: BigNumber | undefined
  lenderApproved: boolean
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleApprove: () => void
  handleSuccess: (blockNumber: number) => void
  actionType: 'supply' | 'withdraw'
}

export function LendSDK({
  lenderPosition,
  lenderApproved,
  poolInfo,
  isOpen,
  handleClose,
  handleApprove,
  handleSuccess,
  actionType,
}: Props): React.ReactElement | null {
  const { account } = useWeb3React()
  const underlyingTokenBalance = usePoolUnderlyingTokenBalance(
    poolInfo.poolName,
    poolInfo.poolType,
    account,
  )
  const { allowance } = usePoolAllowance(
    poolInfo.poolName,
    poolInfo.poolType,
    account,
  )
  const withdrawlLockoutSeconds = useWithdrawlLockoutInSeconds(
    poolInfo.poolName,
    poolInfo.poolType,
  )

  // when close modal, return null to make sure all the states are reset
  if (!isOpen) {
    return null
  }

  if (actionType === 'supply') {
    return (
      <Supply
        underlyingTokenBalance={underlyingTokenBalance}
        withdrawlLockoutSeconds={withdrawlLockoutSeconds}
        allowance={allowance}
        lenderApproved={lenderApproved}
        poolInfo={poolInfo}
        isOpen={isOpen}
        handleClose={handleClose}
        handleApprove={handleApprove}
        handleSuccess={handleSuccess}
      />
    )
  }
  if (actionType === 'withdraw') {
    return (
      <Withdraw
        lenderPosition={lenderPosition}
        withdrawlLockoutSeconds={withdrawlLockoutSeconds}
        poolInfo={poolInfo}
        isOpen={isOpen}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
      />
    )
  }

  return null
}
