import React, { useCallback, useEffect } from 'react'

import { HumaModal, HumaModalHeader } from '../../../../../components/humaModal'
import { useContractFunction } from '../../../../../hooks/useContractFunction'
import useMount from '../../../../../hooks/useMount'
import {
  CreditRecordStaticType,
  CreditRecordType,
} from '../../../../../hooks/usePoolContract'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { CreditState } from '../../../../../utils/credit'
import { PoolInfoType } from '../../../../../utils/pool'
import { isTxFailed } from '../../../../../utils/transaction'
import { ErrorModal } from '../../../components'
import {
  resetAfterSuccess,
  setCLBorrowError,
  setCLBorrowNextStep,
} from '../../store/creditLine.reducers'
import { selectCLState } from '../../store/creditLine.selectors'
import { CL_BORROW_STEP } from '../../store/creditLine.store'
import { ApproveAllowance } from './ApproveAllowance'
import { CheckingEA } from './CheckingEA'
import { Loan } from './Loan'
import { Success } from './Success'
import { Transfer } from './Transfer'

type Props = {
  creditRecord: CreditRecordType
  creditRecordStatic: CreditRecordStaticType
  creditAvailableAmount: number
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleApprove: () => void
  handleSuccess: (blockNumber: number) => void
}

export function Borrow({
  creditRecord,
  creditRecordStatic,
  creditAvailableAmount,
  poolInfo,
  isOpen,
  handleClose,
  handleApprove,
  handleSuccess,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { borrowStep, errorMessage, requestLoan } =
    useAppSelector(selectCLState)
  const { state, failReason, reset, txReceipt } = useContractFunction(
    (state) => state,
  )

  useMount(() => {
    if (creditRecord.state >= CreditState.Approved) {
      dispatch(setCLBorrowNextStep())
    }
  })

  useEffect(() => {
    if (isTxFailed(state) && failReason) {
      dispatch(setCLBorrowError({ errorMessage: failReason }))
    }
  }, [dispatch, failReason, state])

  useEffect(() => {
    if (borrowStep === CL_BORROW_STEP.Done && txReceipt) {
      handleSuccess(txReceipt.blockNumber)
    }
  }, [handleSuccess, borrowStep, txReceipt, requestLoan])

  const handleCloseModal = useCallback(() => {
    reset()
    dispatch(resetAfterSuccess())
    handleClose()
  }, [dispatch, handleClose, reset])

  // when close modal, return null to make sure all the states are reset
  if (!isOpen) {
    return null
  }

  return (
    <HumaModal
      isOpen={isOpen}
      overflowY='auto'
      onClose={handleCloseModal}
      width='480px'
      padding='30px 40px'
      disableBackdropClick
    >
      <HumaModalHeader onClose={handleCloseModal} height={0} />
      {borrowStep === CL_BORROW_STEP.Terms && (
        <CheckingEA poolInfo={poolInfo} handleApprove={handleApprove} />
      )}
      {borrowStep === CL_BORROW_STEP.Loan && (
        <Loan
          poolInfo={poolInfo}
          creditRecordStatic={creditRecordStatic}
          creditAvailableAmount={creditAvailableAmount}
        />
      )}
      {borrowStep === CL_BORROW_STEP.ApproveAllowance && (
        <ApproveAllowance poolInfo={poolInfo} />
      )}
      {borrowStep === CL_BORROW_STEP.TransferMoney && (
        <Transfer poolInfo={poolInfo} />
      )}
      {borrowStep === CL_BORROW_STEP.Done && (
        <Success
          creditRecord={creditRecord}
          poolInfo={poolInfo}
          handleAction={handleCloseModal}
        />
      )}
      {borrowStep === CL_BORROW_STEP.Error && (
        <ErrorModal
          title='Borrow'
          errorMessage={errorMessage}
          handleOk={handleCloseModal}
        />
      )}
    </HumaModal>
  )
}
