import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { toBigNumber, upScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { TransferModal } from '../../../components/TransferModal'
import { setSupplyNextStep } from '../../store/lend.reducers'
import { selectLendState } from '../../store/lend.selectors'

type Props = {
  poolInfo: PoolInfoType
}

export function Transfer({ poolInfo }: Props): React.ReactElement {
  const dispatch = useAppDispatch()
  const { supplyAmount } = useAppSelector(selectLendState)
  const { decimals } = poolInfo.poolUnderlyingToken
  const supplyBigNumber = toBigNumber(upScale(supplyAmount!, decimals))

  const handleSuccess = useCallback(() => {
    dispatch(setSupplyNextStep())
  }, [dispatch])

  return (
    <TransferModal
      poolInfo={poolInfo}
      method='deposit'
      params={[supplyBigNumber]}
      handleSuccess={handleSuccess}
    />
  )
}
