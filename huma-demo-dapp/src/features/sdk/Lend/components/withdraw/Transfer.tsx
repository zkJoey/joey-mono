import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { toBigNumber, upScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { TransferModal } from '../../../components/TransferModal'
import { setWithdrawNextStep } from '../../store/lend.reducers'
import { selectLendState } from '../../store/lend.selectors'

type Props = {
  poolInfo: PoolInfoType
}

export function Transfer({ poolInfo }: Props): React.ReactElement {
  const dispatch = useAppDispatch()
  const { decimals } = poolInfo.poolUnderlyingToken
  const { withdrawAmount } = useAppSelector(selectLendState)
  const withdrawBigNumber = toBigNumber(upScale(withdrawAmount!, decimals))

  const handleSuccess = useCallback(() => {
    dispatch(setWithdrawNextStep())
  }, [dispatch])

  return (
    <TransferModal
      poolInfo={poolInfo}
      method='withdraw'
      params={[withdrawBigNumber]}
      handleSuccess={handleSuccess}
    />
  )
}
