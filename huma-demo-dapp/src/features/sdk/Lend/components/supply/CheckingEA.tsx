import { Box, css, useTheme } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'

import { ApproveLenderIcon } from '../../../../../components/icons'
import { useAppDispatch } from '../../../../../hooks/useRedux'
import EAService from '../../../../../services/EAService'
import { PoolInfoType } from '../../../../../utils/pool'
import { CustomError } from '../../../../../utilTypes'
import { LoadingModal } from '../../../components'
import { BottomButton } from '../../../components/BottomButton'
import { WrapperModal } from '../../../components/WrapperModal'
import { setSupplyError, setSupplyNextStep } from '../../store/lend.reducers'

type Props = {
  poolInfo: PoolInfoType
  handleApprove: () => void
}

export function CheckingEA({
  poolInfo,
  handleApprove,
}: Props): React.ReactElement | null {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const [loading, setLoading] = useState(false)

  const styles = {
    iconWrapper: css`
      ${theme.cssMixins.rowCentered};
      margin-top: 30px;
    `,
    description: css`
      ${theme.cssMixins.rowCentered};
      margin-top: 50px;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      color: #a8a1b2;
    `,
  }

  const approveLender = async () => {
    if (account) {
      try {
        setLoading(true)
        const payload = {
          poolAddress: poolInfo.pool,
          lenderWalletAddress: account,
        }
        await EAService.approveLender(payload, chainId!)
        handleApprove()
        setLoading(false)
        dispatch(setSupplyNextStep())
      } catch (e: unknown) {
        const error = e as CustomError
        setLoading(false)
        dispatch(setSupplyError(error.message))
      }
    }
  }

  if (!loading) {
    return (
      <WrapperModal
        title='Lender Approval'
        subTitle='This pool requires lender approval'
      >
        <Box css={styles.iconWrapper}>
          <ApproveLenderIcon />
        </Box>
        <Box css={styles.description} />
        <BottomButton variant='contained' onClick={approveLender}>
          GET APPROVED
        </BottomButton>
      </WrapperModal>
    )
  }

  return (
    <LoadingModal
      title='Approval Pending'
      description='Waiting for approval confirmation...'
    />
  )
}
