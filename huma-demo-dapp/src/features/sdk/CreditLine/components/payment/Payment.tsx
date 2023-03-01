import React, { useCallback, useEffect } from 'react'

import { HumaModal, HumaModalHeader } from '../../../../../components/humaModal'
import { useContractFunction } from '../../../../../hooks/useContractFunction'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { PoolInfoType } from '../../../../../utils/pool'
import { isTxFailed } from '../../../../../utils/transaction'
import { ErrorModal } from '../../../components'
import {
  resetAfterSuccess,
  setCLPaymentError,
} from '../../store/creditLine.reducers'
import {
  selectCLErrorMessage,
  selectCLPaymentAmount,
  selectCLPaymentStep,
} from '../../store/creditLine.selectors'
import { CL_PAYMENT_STEP } from '../../store/creditLine.store'
import { ApproveAllowance } from './ApproveAllowance'
import { Payback } from './Payback'
import { Success } from './Success'
import { Transfer } from './Transfer'

type Props = {
  payoffAmount: number
  totalDueAmount: number
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleSuccess: (blockNumber: number) => void
}

export function Payment({
  payoffAmount,
  totalDueAmount,
  poolInfo,
  isOpen,
  handleClose,
  handleSuccess,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const paymentStep = useAppSelector(selectCLPaymentStep)
  const errorMessage = useAppSelector(selectCLErrorMessage)
  const paymentAmount = useAppSelector(selectCLPaymentAmount)
  const { state, failReason, reset, txReceipt } = useContractFunction(
    (state) => state,
  )

  useEffect(() => {
    if (isTxFailed(state) && failReason) {
      dispatch(setCLPaymentError(failReason))
    }
  }, [dispatch, failReason, state])

  useEffect(() => {
    if (paymentStep === CL_PAYMENT_STEP.Done && txReceipt) {
      handleSuccess(txReceipt.blockNumber)
    }
  }, [handleSuccess, paymentAmount, paymentStep, txReceipt])

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
      {paymentStep === CL_PAYMENT_STEP.Payback && (
        <Payback
          poolInfo={poolInfo}
          payoffAmount={payoffAmount}
          totalDueAmount={totalDueAmount}
        />
      )}
      {paymentStep === CL_PAYMENT_STEP.ApproveAllowance && (
        <ApproveAllowance poolInfo={poolInfo} />
      )}
      {paymentStep === CL_PAYMENT_STEP.TransferMoney && (
        <Transfer poolInfo={poolInfo} />
      )}
      {paymentStep === CL_PAYMENT_STEP.Done && (
        <Success poolInfo={poolInfo} handleAction={handleCloseModal} />
      )}
      {paymentStep === CL_PAYMENT_STEP.Error && (
        <ErrorModal
          title='Pay'
          errorMessage={errorMessage}
          handleOk={handleCloseModal}
        />
      )}
    </HumaModal>
  )
}
