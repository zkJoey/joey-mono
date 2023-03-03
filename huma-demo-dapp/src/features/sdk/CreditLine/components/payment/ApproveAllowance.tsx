import React, { useCallback } from 'react'

import { useAppDispatch } from '../../../../../hooks/useRedux'
import { PoolInfoType } from '../../../../../utils/pool'
import { ApproveAllowanceModal } from '../../../components/ApproveAllowanceModal'
import { setCLPaymentNextStep } from '../../store/creditLine.reducers'

type Props = {
  poolInfo: PoolInfoType
}

export function ApproveAllowance({
  poolInfo,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()

  const handleSuccess = useCallback(() => {
    dispatch(setCLPaymentNextStep())
  }, [dispatch])

  return (
    <ApproveAllowanceModal poolInfo={poolInfo} handleSuccess={handleSuccess} />
  )
}
