import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { toBigNumber, upScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { TransferModal } from '../../../components/TransferModal'
import { setCLBorrowNextStep } from '../../store/creditLine.reducers'
import { selectCLState } from '../../store/creditLine.selectors'

type Props = {
  poolInfo: PoolInfoType
}

export function Transfer({ poolInfo }: Props): React.ReactElement {
  const dispatch = useAppDispatch()
  const { poolUnderlyingToken } = poolInfo
  const { decimals } = poolUnderlyingToken
  const { requestLoan } = useAppSelector(selectCLState)
  const requestLoanBigNumber = toBigNumber(upScale(requestLoan!, decimals))
  const receiverAddress = '0x976EA74026E726554dB657fA54763abd0C3a0aa9'

  const handleSuccess = useCallback(() => {
    dispatch(setCLBorrowNextStep())
  }, [dispatch])

  return (
    <TransferModal
      poolInfo={poolInfo}
      method='drawdown'
      params={[requestLoanBigNumber, receiverAddress]}
      handleSuccess={handleSuccess}
    />
  )
}
