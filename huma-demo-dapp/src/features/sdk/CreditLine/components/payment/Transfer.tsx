import { useWeb3React } from '@web3-react/core'
import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { toBigNumber, upScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { TransferModal } from '../../../components/TransferModal'
import { setCLPaymentNextStep } from '../../store/creditLine.reducers'
import { selectCLState } from '../../store/creditLine.selectors'

type Props = {
  poolInfo: PoolInfoType
}

export function Transfer({ poolInfo }: Props): React.ReactElement {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { paymentAmount } = useAppSelector(selectCLState)
  const { decimals } = poolInfo.poolUnderlyingToken
  const paymentBigNumber = toBigNumber(upScale(paymentAmount!, decimals))

  const handleSuccess = useCallback(() => {
    dispatch(setCLPaymentNextStep())
  }, [dispatch])

  return (
    <TransferModal
      poolInfo={poolInfo}
      method='makePayment'
      params={[account, paymentBigNumber]}
      handleSuccess={handleSuccess}
    />
  )
}
