import { BigNumber } from 'ethers'
import React, { useCallback, useState } from 'react'

import { useAppDispatch } from '../../../../../hooks/useRedux'
import { downScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { ChooseAmountModal } from '../../../components'
import { setWithdrawAmount, setWithdrawStep } from '../../store/lend.reducers'
import { LEND_WITHDRAW_STEP } from '../../store/lend.store'

type Props = {
  lenderPosition: BigNumber
  poolInfo: PoolInfoType
}

export function ChooseAmount({
  lenderPosition,
  poolInfo,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { poolUnderlyingToken } = poolInfo
  const { symbol, decimals } = poolUnderlyingToken
  const [currentAmount, setCurrentAmount] = useState(0)
  const withdrawableAmount = downScale<number>(lenderPosition, decimals)

  const handleChangeAmount = useCallback(
    (newAmount: number) => {
      setCurrentAmount(newAmount)
      dispatch(setWithdrawAmount(newAmount))
    },
    [dispatch],
  )

  const handleAction = useCallback(() => {
    dispatch(setWithdrawStep(LEND_WITHDRAW_STEP.TransferMoney))
  }, [dispatch])

  return (
    <ChooseAmountModal
      title={`Withdraw ${symbol}`}
      description1='Choose Amount'
      sliderMax={Number(withdrawableAmount)}
      currentAmount={currentAmount}
      tokenSymbol={symbol}
      handleChangeAmount={handleChangeAmount}
      handleAction={handleAction}
      actionText='withdraw'
      hideTerms
    />
  )
}
