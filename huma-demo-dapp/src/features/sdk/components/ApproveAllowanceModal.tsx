import { MaxUint256 } from '@ethersproject/constants'
import { Box, css, useTheme } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect } from 'react'
import { AutoPaybackIcon } from '../../../components/icons'

import { useContractFunction } from '../../../hooks/useContractFunction'
import useMount from '../../../hooks/useMount'
import { usePoolUnderlyingTokenContract } from '../../../hooks/usePoolContract'
import { PoolInfoType } from '../../../utils/pool'
import { TxStateType } from '../../../utils/transaction'
import { BottomButton } from './BottomButton'
import { LoadingModal } from './LoadingModal'
import { WrapperModal } from './WrapperModal'

type Props = {
  poolInfo: PoolInfoType
  handleSuccess: () => void
  showAutoPayback?: boolean
}

export function ApproveAllowanceModal({
  poolInfo,
  handleSuccess,
  showAutoPayback = false,
}: Props): React.ReactElement | null {
  const theme = useTheme()
  const { provider } = useWeb3React()
  const { poolUnderlyingToken } = poolInfo
  const { symbol } = poolUnderlyingToken
  const poolUnderlyingTokenContract = usePoolUnderlyingTokenContract(
    poolInfo.poolName,
    poolInfo.poolType,
  )
  const { state, send, reset } = useContractFunction((state) => state)
  const waitingForAccept = state === TxStateType.New

  useEffect(() => {
    if (state === TxStateType.Success) {
      reset()
      handleSuccess()
    }
  }, [handleSuccess, reset, state, symbol])

  const styles = {
    iconWrapper: css`
      ${theme.cssMixins.rowCentered};
      margin-top: 30px;
    `,
    description: css`
      margin-top: 14px;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      color: #a8a1b2;
      padding: 0 12px;
    `,
  }

  const sendApprove = useCallback(() => {
    send(
      poolUnderlyingTokenContract!,
      'approve',
      [poolInfo.pool, MaxUint256],
      provider,
    )
  }, [poolInfo.pool, poolUnderlyingTokenContract, provider, send])

  useMount(() => {
    if (!showAutoPayback) {
      sendApprove()
    }
  })

  if (showAutoPayback && waitingForAccept) {
    return (
      <WrapperModal
        title='Auto Payback'
        subTitle='Enable auto payback and never miss payments. You only need to do it once.'
      >
        <Box css={styles.iconWrapper}>
          <AutoPaybackIcon />
        </Box>
        <Box css={styles.description}>
          This allowance transaction removes the need to confirm follow up{' '}
          {symbol} transactions. Gas is on us.
        </Box>
        <BottomButton variant='contained' onClick={sendApprove}>
          APPROVE {symbol} PAYMENTS
        </BottomButton>
      </WrapperModal>
    )
  }

  return (
    <LoadingModal
      title={`Approve ${symbol}`}
      description='Waiting for approval confirmation...'
    />
  )
}
