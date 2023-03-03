import { Box, Button, css, Typography, useTheme } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

import {
  CheckCircleIcon,
  CheckGreenIcon,
} from '../../../../../components/icons'
import spinner from '../../../../../components/icons/spinner.gif'
import { useCLCreditRecord } from '../../../../../hooks/useCLPoolContract'
import { useAppDispatch } from '../../../../../hooks/useRedux'
import EAService from '../../../../../services/EAService'
import { EARejectMessage, EARejectReason } from '../../../../../utils/const'
import { PoolInfoType } from '../../../../../utils/pool'
import { CustomError } from '../../../../../utilTypes'
import {
  setCLBorrowError,
  setCLBorrowNextStep,
} from '../../store/creditLine.reducers'

type Props = {
  poolInfo: PoolInfoType
  handleApprove: () => void
}

export function CheckingEA({
  poolInfo,
  handleApprove,
}: Props): React.ReactElement {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const [status, setStatus] = useState<'checking' | 'success'>('checking')
  const { checkIsApproved } = useCLCreditRecord(poolInfo.poolName, account)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          poolAddress: poolInfo.pool,
          borrowerWalletAddress: account,
          receivableAddress: poolInfo.assetAddress,
        }
        await EAService.approve(payload, chainId!, checkIsApproved)
        setStatus('success')
        handleApprove()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.cause?.applicationRejected) {
          dispatch(
            setCLBorrowError({
              errorMessage: EARejectMessage,
              errorReason: EARejectReason,
            }),
          )
        } else {
          const error = e as CustomError
          dispatch(
            setCLBorrowError({
              errorMessage: error.message,
            }),
          )
        }
      }
    }
    fetchData()
  }, [
    account,
    chainId,
    checkIsApproved,
    dispatch,
    handleApprove,
    poolInfo.assetAddress,
    poolInfo.pool,
  ])

  const styles = {
    wrapper: css`
      height: 518px;
      position: relative;
    `,
    header: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: -5px;
    `,
    content: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: 30px;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      line-height: 24px;
      color: #49505b;
      margin-bottom: 65px;
    `,
    checkWrapper: css`
      ${theme.cssMixins.rowVCentered}
      width: 100%;
      height: 72px;
      background: #f9f8fa;
      border-radius: 4px;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      color: #49505b;
    `,
    checkIcon: css`
      ${theme.cssMixins.rowCentered}
      width: 105px;
      height: 100%;

      & > img {
        max-width: 100%;
        max-height: 100%;
      }
    `,
    congratsWrapper: css`
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      padding: 0 16px;
      ${theme.cssMixins.rowVCentered}
      margin-top: 60px;
      height: 52px;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #2e7d32;
      border-radius: 4px;
    `,
    bottom: css`
      & .MuiButtonBase-root {
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    `,
  }

  const goToNextStep = () => {
    dispatch(setCLBorrowNextStep())
  }

  return (
    <Box css={styles.wrapper}>
      <Typography variant='h6' css={styles.header}>
        Borrow
      </Typography>
      <Box css={styles.content}>
        Looks like it’s your first time around here. Let’s see if you qualify...
      </Box>
      <Box css={styles.checkWrapper} sx={{ marginBottom: '16px' }}>
        <Box css={styles.checkIcon}>
          {status === 'checking' && <img src={spinner} alt='loading...' />}
          {status === 'success' && <CheckGreenIcon />}
        </Box>
        <Box>Checking your income</Box>
      </Box>
      <Box css={styles.checkWrapper}>
        <Box css={styles.checkIcon}>
          {status === 'checking' && <img src={spinner} alt='loading...' />}
          {status === 'success' && <CheckGreenIcon />}
        </Box>
        <Box>Checking other qualifications</Box>
      </Box>
      {status === 'success' && (
        <>
          <Box css={styles.congratsWrapper}>
            <CheckCircleIcon />
            <Box sx={{ marginLeft: '16px' }}>
              Congrats, you are qualified to borrow
            </Box>
          </Box>
          <Box css={styles.bottom}>
            <Button variant='contained' onClick={goToNextStep}>
              CONTINUE TO BORROW
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
