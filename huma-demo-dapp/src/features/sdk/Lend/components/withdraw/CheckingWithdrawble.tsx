import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

import { useLastDepositTime } from '../../../../../hooks/usePoolContract'
import { useAppDispatch } from '../../../../../hooks/useRedux'
import { isEmpty } from '../../../../../utils/common'
import { PoolInfoType } from '../../../../../utils/pool'
import timeUtil from '../../../../../utils/time'
import { ErrorModal, LoadingModal } from '../../../components'
import { setWithdrawNextStep } from '../../store/lend.reducers'

type Props = {
  withdrawlLockoutSeconds: number | undefined
  poolInfo: PoolInfoType
  handleCloseModal: () => void
}

export function CheckingWithdrawable({
  withdrawlLockoutSeconds,
  poolInfo,
  handleCloseModal,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lastDepositTime = useLastDepositTime(
    poolInfo.poolName,
    poolInfo.poolType,
    account,
  )

  const { symbol } = poolInfo.poolUnderlyingToken
  const [status, setStatus] = useState<'checking' | 'error'>('checking')

  useEffect(() => {
    if (!isEmpty(withdrawlLockoutSeconds) && !isEmpty(lastDepositTime)) {
      const currentTimestamp = timeUtil.getUnixTimestamp()
      if (lastDepositTime! + withdrawlLockoutSeconds! > currentTimestamp) {
        setStatus('error')
      } else {
        dispatch(setWithdrawNextStep())
      }
    }
  }, [dispatch, lastDepositTime, withdrawlLockoutSeconds])

  if (status === 'error') {
    const errorMessage = `Your last deposit was on ${timeUtil.timestampToLL(
      lastDepositTime,
    )}. Depositors need to wait for ${timeUtil
      .secondsToDays(withdrawlLockoutSeconds)
      .toFixed(0)} days before withdrawal.`
    return (
      <ErrorModal
        title={`Withdraw ${symbol}`}
        errorReason='Withdraw too soon'
        errorMessage={errorMessage}
        handleOk={handleCloseModal}
      />
    )
  }

  return (
    <LoadingModal
      title={`Withdraw ${symbol}`}
      description='Checking withdrawable amount...'
    />
  )
}
