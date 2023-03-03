import React from 'react'

import {
  CreditRecordStaticType,
  CreditRecordType,
} from '../../../../hooks/usePoolContract'
import { PoolInfoType } from '../../../../utils/pool'
import { Borrow } from './borrow/Borrow'
import { Payment } from './payment/Payment'

type Props = {
  creditRecord: CreditRecordType
  creditRecordStatic: CreditRecordStaticType
  creditAvailableAmount: number
  payoffAmount: number
  totalDueAmount: number
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleApprove: () => void
  handleSuccess: (blockNumber: number) => void
  actionType: 'borrow' | 'payment'
}

export function CreditLineSDK({
  creditRecord,
  creditRecordStatic,
  creditAvailableAmount,
  payoffAmount,
  totalDueAmount,
  poolInfo,
  isOpen,
  handleClose,
  handleApprove,
  handleSuccess,
  actionType,
}: Props): React.ReactElement | null {
  // when close modal, return null to make sure all the states are reset
  if (!isOpen) {
    return null
  }

  if (actionType === 'borrow') {
    return (
      <Borrow
        creditRecord={creditRecord}
        creditRecordStatic={creditRecordStatic}
        creditAvailableAmount={creditAvailableAmount}
        poolInfo={poolInfo}
        isOpen={isOpen}
        handleClose={handleClose}
        handleApprove={handleApprove}
        handleSuccess={handleSuccess}
      />
    )
  }

  if (actionType === 'payment') {
    return (
      <Payment
        payoffAmount={payoffAmount}
        totalDueAmount={totalDueAmount}
        poolInfo={poolInfo}
        isOpen={isOpen}
        handleClose={handleClose}
        handleSuccess={handleSuccess}
      />
    )
  }

  return null
}
