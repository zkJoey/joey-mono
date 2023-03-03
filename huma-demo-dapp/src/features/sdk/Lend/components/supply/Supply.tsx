import { BigNumber } from 'ethers'
import React, { useCallback, useEffect } from 'react'

import { HumaModal, HumaModalHeader } from '../../../../../components/humaModal'
import { useContractFunction } from '../../../../../hooks/useContractFunction'
import useMount from '../../../../../hooks/useMount'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { downScale } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { isTxFailed } from '../../../../../utils/transaction'
import { ErrorModal } from '../../../components'
import {
  resetAfterSuccess,
  setSupplyError,
  setSupplyNextStep,
} from '../../store/lend.reducers'
import { selectLendState } from '../../store/lend.selectors'
import { LEND_SUPPLY_STEP } from '../../store/lend.store'
import { ApproveAllowance } from './ApproveAllowance'
import { CheckingEA } from './CheckingEA'
import { ChooseAmount } from './ChooseAmount'
import { Success } from './Success'
import { Transfer } from './Transfer'

type Props = {
  underlyingTokenBalance: BigNumber
  withdrawlLockoutSeconds: number | undefined
  allowance: BigNumber
  lenderApproved: boolean
  poolInfo: PoolInfoType
  isOpen: boolean
  handleClose: () => void
  handleApprove: () => void
  handleSuccess: (blockNumber: number) => void
}

export function Supply({
  underlyingTokenBalance,
  withdrawlLockoutSeconds,
  allowance,
  lenderApproved,
  poolInfo,
  isOpen,
  handleClose,
  handleApprove,
  handleSuccess,
}: Props): React.ReactElement | null {
  const dispatch = useAppDispatch()
  const { poolUnderlyingToken } = poolInfo
  const { decimals } = poolUnderlyingToken
  const { supplyStep, errorMessage, supplyAmount } =
    useAppSelector(selectLendState)
  const { state, failReason, reset, txReceipt } = useContractFunction(
    (state) => state,
  )
  const balanceWithoutDecimals = downScale(underlyingTokenBalance, decimals)

  useMount(() => {
    if (lenderApproved) {
      dispatch(setSupplyNextStep())
    }
  })

  useEffect(() => {
    if (isTxFailed(state) && failReason) {
      dispatch(setSupplyError(failReason))
    }
  }, [dispatch, failReason, state])

  useEffect(() => {
    if (supplyStep === LEND_SUPPLY_STEP.Done && txReceipt) {
      handleSuccess(txReceipt.blockNumber)
    }
  }, [handleSuccess, poolInfo.pool, supplyAmount, supplyStep, txReceipt])

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
      {supplyStep === LEND_SUPPLY_STEP.ApproveLender && (
        <CheckingEA poolInfo={poolInfo} handleApprove={handleApprove} />
      )}
      {supplyStep === LEND_SUPPLY_STEP.ChooseAmount && (
        <ChooseAmount
          allowance={allowance}
          withdrawlLockoutSeconds={withdrawlLockoutSeconds}
          underlyingTokenBalance={balanceWithoutDecimals}
          poolInfo={poolInfo}
        />
      )}
      {supplyStep === LEND_SUPPLY_STEP.ApproveAllowance && (
        <ApproveAllowance poolInfo={poolInfo} />
      )}
      {supplyStep === LEND_SUPPLY_STEP.TransferMoney && (
        <Transfer poolInfo={poolInfo} />
      )}
      {supplyStep === LEND_SUPPLY_STEP.Done && (
        <Success poolInfo={poolInfo} handleAction={handleCloseModal} />
      )}
      {supplyStep === LEND_SUPPLY_STEP.Error && (
        <ErrorModal
          title='Supply'
          errorReason='Sorry there was an error'
          errorMessage={errorMessage}
          handleOk={handleCloseModal}
        />
      )}
    </HumaModal>
  )
}
