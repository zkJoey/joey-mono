import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect, useState } from 'react'

import { useCLPoolAllowance } from '../../../../../hooks/useCLPoolContract'
import { useAppDispatch } from '../../../../../hooks/useRedux'
import { toBigNumber, upScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { ChooseAmountModal } from '../../../components'
import {
  setCLPaymentAmount,
  setCLPaymentStep,
} from '../../store/creditLine.reducers'
import { CL_PAYMENT_STEP } from '../../store/creditLine.store'

type Props = {
  payoffAmount: number
  totalDueAmount: number
  poolInfo: PoolInfoType
}

export function Payback({
  payoffAmount,
  totalDueAmount,
  poolInfo,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { symbol, decimals } = poolInfo.poolUnderlyingToken
  const [currentAmount, setCurrentAmount] = useState(0)
  const { allowance } = useCLPoolAllowance(poolInfo.poolName, account)

  useEffect(() => {
    setCurrentAmount(totalDueAmount)
    dispatch(setCLPaymentAmount(totalDueAmount))
  }, [dispatch, totalDueAmount])

  const handleChangeAmount = useCallback(
    (newAmount: number) => {
      setCurrentAmount(newAmount)
      dispatch(setCLPaymentAmount(newAmount))
    },
    [dispatch],
  )

  const handleAction = useCallback(() => {
    const payAmount = upScale(currentAmount, decimals)
    const step = toBigNumber(payAmount).gt(allowance)
      ? CL_PAYMENT_STEP.ApproveAllowance
      : CL_PAYMENT_STEP.TransferMoney
    dispatch(setCLPaymentStep(step))
  }, [allowance, currentAmount, decimals, dispatch])

  return (
    <ChooseAmountModal
      title='Pay'
      description1='Choose amount'
      sliderMax={payoffAmount}
      currentAmount={currentAmount}
      tokenSymbol={symbol}
      handleChangeAmount={handleChangeAmount}
      handleAction={handleAction}
      actionText='pay'
      payoffAmount={payoffAmount}
      hideTerms
    />
  )
}
