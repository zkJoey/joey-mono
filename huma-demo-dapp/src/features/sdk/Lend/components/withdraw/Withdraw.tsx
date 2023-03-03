import { BigNumber } from 'ethers'
import React, { useCallback, useEffect } from 'react'

import { HumaModal, HumaModalHeader } from '../../../../../components/humaModal'
import { useContractFunction } from '../../../../../hooks/useContractFunction'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { PoolInfoType } from '../../../../../utils/pool'
import { isTxFailed } from '../../../../../utils/transaction'
import { ErrorModal } from '../../../components'
import { resetAfterSuccess, setWithdrawError } from '../../store/lend.reducers'
import { selectLendState } from '../../store/lend.selectors'
import { LEND_WITHDRAW_STEP } from '../../store/lend.store'
import { CheckingWithdrawable } from './CheckingWithdrawble'
import { ChooseAmount } from './ChooseAmount'
import { Success } from './Success'
import { Transfer } from './Transfer'

type Props = {
  lenderPosition: BigNumber | undefined
  withdrawlLockoutSeconds: number | undefined
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleSuccess: (blockNumber: number) => void
}

export function Withdraw({
  lenderPosition,
  withdrawlLockoutSeconds,
  poolInfo,
  isOpen,
  handleClose,
  handleSuccess,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { withdrawStep, errorMessage, withdrawAmount } =
    useAppSelector(selectLendState)
  const { state, failReason, reset, txReceipt } = useContractFunction(
    (state) => state,
  )

  useEffect(() => {
    if (isTxFailed(state) && failReason) {
      dispatch(setWithdrawError(failReason))
    }
  }, [dispatch, failReason, state])

  useEffect(() => {
    if (withdrawStep === LEND_WITHDRAW_STEP.Done && txReceipt) {
      handleSuccess(txReceipt.blockNumber)
    }
  }, [handleSuccess, poolInfo.pool, txReceipt, withdrawAmount, withdrawStep])

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
      {withdrawStep === LEND_WITHDRAW_STEP.CheckingWithdrawable && (
        <CheckingWithdrawable
          poolInfo={poolInfo}
          withdrawlLockoutSeconds={withdrawlLockoutSeconds}
          handleCloseModal={handleCloseModal}
        />
      )}
      {withdrawStep === LEND_WITHDRAW_STEP.ChooseAmount && (
        <ChooseAmount lenderPosition={lenderPosition!} poolInfo={poolInfo} />
      )}
      {withdrawStep === LEND_WITHDRAW_STEP.TransferMoney && (
        <Transfer poolInfo={poolInfo} />
      )}
      {withdrawStep === LEND_WITHDRAW_STEP.Done && (
        <Success poolInfo={poolInfo} handleAction={handleCloseModal} />
      )}
      {withdrawStep === LEND_WITHDRAW_STEP.Error && (
        <ErrorModal
          title='Withdraw'
          errorReason='Sorry there was an error'
          errorMessage={errorMessage}
          handleOk={handleCloseModal}
        />
      )}
    </HumaModal>
  )
}
