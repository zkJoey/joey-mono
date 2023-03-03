import React from 'react'

import { CreditRecordType } from '../../../../../hooks/usePoolContract'
import { useAppSelector } from '../../../../../hooks/useRedux'
import { PoolInfoType } from '../../../../../utils/pool'
import timeUtil from '../../../../../utils/time'
import { TxDoneModal } from '../../../components/TxDoneModal'
import { selectCLState } from '../../store/creditLine.selectors'

type Props = {
  poolInfo: PoolInfoType
  creditRecord: CreditRecordType
  handleAction: () => void
}

export function Success({
  poolInfo,
  creditRecord,
  handleAction,
}: Props): React.ReactElement {
  const { requestLoanNet } = useAppSelector(selectCLState)
  const { poolUnderlyingToken } = poolInfo
  const { symbol } = poolUnderlyingToken
  const dueDate = timeUtil.timestampToLL(creditRecord?.dueDate.toNumber())

  const content = [
    `${requestLoanNet} ${symbol} is now in your wallet.`,
    `Note: your payment will be automatically deducted on ${dueDate}.`,
  ]

  return <TxDoneModal handleAction={handleAction} content={content} />
}
