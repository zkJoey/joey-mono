import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect, useState } from 'react'

import {
  useCLFeeManager,
  useCLPoolAllowance,
} from '../../../../../hooks/useCLPoolContract'
import { CreditRecordStaticType } from '../../../../../hooks/usePoolContract'
import { useAppDispatch } from '../../../../../hooks/useRedux'
import { PoolInfoType } from '../../../../../utils/pool'
import { ChooseAmountModal } from '../../../components'
import {
  setCLBorrowAllowanceApprove,
  setCLBorrowAmount,
} from '../../store/creditLine.reducers'
import { CL_BORROW_STEP } from '../../store/creditLine.store'

type Props = {
  creditRecordStatic: CreditRecordStaticType
  creditAvailableAmount: number
  poolInfo: PoolInfoType
}

export function Loan({
  creditRecordStatic,
  creditAvailableAmount,
  poolInfo,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { poolUnderlyingToken } = poolInfo
  const { symbol } = poolUnderlyingToken
  const { approved } = useCLPoolAllowance(poolInfo.poolName, account)
  const { getFeesCharged } = useCLFeeManager(poolInfo.poolName)
  const [chargedFees, setChargedFees] = useState(0)
  const [currentAmount, setCurrentAmount] = useState(0)

  useEffect(() => {
    dispatch(setCLBorrowAllowanceApprove(approved))
  }, [approved, dispatch])

  const handleChangeAmount = useCallback(
    (newAmount: number) => {
      setCurrentAmount(newAmount)
      const newChargedFees = getFeesCharged(newAmount)
      setChargedFees(newChargedFees)
    },
    [getFeesCharged],
  )

  const handleAction = useCallback(() => {
    const step = approved
      ? CL_BORROW_STEP.TransferMoney
      : CL_BORROW_STEP.ApproveAllowance
    dispatch(
      setCLBorrowAmount({
        requestLoan: currentAmount,
        chargedFees,
        step,
      }),
    )
  }, [approved, chargedFees, currentAmount, dispatch])

  return (
    <ChooseAmountModal
      title='Borrow'
      description1='Choose Amount'
      sliderMax={creditAvailableAmount}
      currentAmount={currentAmount}
      tokenSymbol={symbol}
      topLeft='Origination Fee'
      topRight={`${chargedFees} ${symbol}`}
      downLeft='APR'
      downRight={`${creditRecordStatic.aprInBps / 100}%`}
      handleChangeAmount={handleChangeAmount}
      handleAction={handleAction}
      actionText='borrow'
    />
  )
}
