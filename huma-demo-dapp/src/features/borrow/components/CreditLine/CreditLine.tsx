import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useState } from 'react'

import { useCLStats } from '../../../../hooks/useCLPoolContract'
import { useMQ } from '../../../../hooks/useMQ'
import { usePoolInfo, usePoolName } from '../../../../hooks/usePool'
import { useRefresh } from '../../../../hooks/useRefresh'
import { formatMoney } from '../../../../utils/number'
import { POOL_TYPE, PoolMap } from '../../../../utils/pool'
import { timestampToLL } from '../../../../utils/time'
import { CreditLineSDK } from '../../../sdk/CreditLine/components'
import { ConnectWalletButton } from '../../../wallet/components'

export function CreditLine(): React.ReactElement {
  const theme = useTheme()
  const { isLgSize, isSmSize, isXsSize } = useMQ()
  const buttonWidth = isLgSize ? 180 : 140
  const poolName = usePoolName()
  const poolInfo = usePoolInfo(poolName, POOL_TYPE.CreditLine)
  const { account, isActive } = useWeb3React()
  const [accountStats, refreshCLStats] = useCLStats(poolName, account)
  const [actionType, setActionType] = useState<'borrow' | 'payment'>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [subscribe, loading] = useRefresh()
  const {
    creditRecord,
    creditRecordStatic,
    isApproved,
    payoffAmount,
    principalAmount,
    creditAvailableAmount,
    totalDueAmount,
  } = accountStats

  const dueDate = timestampToLL(creditRecord?.dueDate.toNumber()).split(',')[0]

  const getPadding = () => {
    if (isSmSize) {
      return 32
    }
    return 48
  }

  const getButtonWidth = () => {
    if (isSmSize) {
      return '100%'
    }
    if (isApproved) {
      return `${buttonWidth}px`
    }
    return '180px'
  }

  const styles = {
    wrapper: css`
      max-width: 1307px;
      margin: 0 auto;
      margin-bottom: 40px;
    `,
    title: css`
      font-family: 'Uni-Neue-Black';
      color: ${theme.palette.text.primary};
      font-size: 24px;
      margin-bottom: 16px;
    `,
    description: css`
      font-family: 'Uni-Neue-Regular';
      color: ${theme.palette.text.primary};
      font-size: 1rem;
    `,
    infoWrapper: css`
      ${theme.cssMixins.rowSpaceBetweened}
      background: #ffffff;
      box-shadow: 0px 4px 40px 8px rgba(0, 0, 0, 0.04);
      border-radius: 24px;
      padding: ${getPadding()}px;
      padding-bottom: 72px;
    `,
    infoLeft: css`
      ${theme.cssMixins.rowSpaceBetweened}
      flex-direction: ${isXsSize ? 'column' : 'row'};
      justify-content: ${isSmSize ? 'flex-start' : 'space-between'};
      & > div {
        margin-bottom: ${isXsSize ? 20 : 0}px;
        margin-right: ${isSmSize ? 40 : 0}px;
      }
      & > div:last-of-type {
        margin-right: 0px;
        margin-bottom: 0px;
      }
    `,
    infoTitle: css`
      ${theme.cssMixins.rowVCentered}
      font-family: 'Uni-Neue-Bold';
      font-size: ${isLgSize ? 20 : 18}px;
      color: #423b46;
      margin-bottom: 8px;
    `,
    infoContent: (num: number) => css`
      font-family: 'Uni-Neue-Regular';
      font-size: ${isLgSize ? 32 : 26}px;
      color: ${num > 0 ? '#534E59' : '#d3ccdd'};
    `,
    dueDateOn: css`
      width: 16px;
      height: 16px;
      background: #45cb71;
      border-radius: 50%;
      margin-left: 8px;
    `,
    infoRight: css`
      ${theme.cssMixins.rowSpaceBetweened}
      align-items: end;
      width: ${isSmSize ? '100%' : 'unset'};
    `,
    button: css`
      height: 42px;
      width: ${getButtonWidth()};
    `,
  }

  const handleBorrow = () => {
    setModalIsOpen(true)
    setActionType('borrow')
  }

  const handlePay = () => {
    setModalIsOpen(true)
    setActionType('payment')
  }

  const handleClose = () => {
    setModalIsOpen(false)
    setActionType(undefined)
  }

  const handleApproveSuccess = useCallback(() => {
    refreshCLStats()
  }, [refreshCLStats])

  const handleSuccess = useCallback(
    (blockNumber: number) => {
      subscribe(blockNumber, refreshCLStats)
    },
    [refreshCLStats, subscribe],
  )

  return (
    <Box css={styles.wrapper}>
      <Box css={styles.title}>Credit Lines</Box>
      <Box css={styles.description} marginBottom='47px'>
        {PoolMap.CreditLine[poolName].borrowDesc}
      </Box>
      <Box css={styles.infoWrapper}>
        <Grid
          container
          spacing={2}
          columnSpacing={{ md: isApproved ? 0 : 20 }}
          justifyContent='space-between'
        >
          <Grid item xs={12} md={7}>
            <Box css={styles.infoLeft}>
              <Box>
                <Box css={styles.infoTitle}>Available Credit</Box>
                <Box
                  css={styles.infoContent(creditAvailableAmount)}
                  id='credit-line-available-credit'
                >
                  {loading ? (
                    <Skeleton variant='text' width={80} />
                  ) : (
                    <>{formatMoney(creditAvailableAmount)}</>
                  )}
                </Box>
              </Box>
              <Box>
                <Box css={styles.infoTitle}>Current Balance</Box>
                <Box
                  css={styles.infoContent(principalAmount)}
                  id='credit-line-current-balance'
                >
                  {loading ? (
                    <Skeleton variant='text' width={80} />
                  ) : (
                    <> {formatMoney(principalAmount)}</>
                  )}
                </Box>
              </Box>
              <Box>
                {dueDate ? (
                  <Box css={styles.infoTitle}>
                    <Box>Due on {dueDate}</Box> <Box css={styles.dueDateOn} />
                  </Box>
                ) : (
                  <Box css={styles.infoTitle}>Due</Box>
                )}
                <Box css={styles.infoContent(totalDueAmount)}>
                  {loading ? (
                    <Skeleton variant='text' width={80} />
                  ) : (
                    <> {formatMoney(totalDueAmount)}</>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            display='flex'
            alignItems='flex-end'
            justifyContent='flex-end'
            width='100%'
          >
            <Box css={styles.infoRight}>
              {isActive && (
                <>
                  <Button
                    id='credit-line-pay-btn'
                    css={styles.button}
                    variant='contained'
                    sx={{ marginRight: '24px' }}
                    disabled={payoffAmount <= 0}
                    onClick={handlePay}
                  >
                    PAY
                  </Button>
                  {!isApproved ? (
                    <Button
                      css={styles.button}
                      variant='contained'
                      onClick={handleBorrow}
                    >
                      OPEN A CREDIT LINE
                    </Button>
                  ) : (
                    <Button
                      id='credit-line-borrow-btn'
                      css={styles.button}
                      variant='contained'
                      disabled={creditAvailableAmount === 0}
                      onClick={handleBorrow}
                    >
                      BORROW
                    </Button>
                  )}
                </>
              )}
              {!isActive && (
                <ConnectWalletButton
                  text='CONNECT YOUR WALLET'
                  variant='contained'
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {creditRecord && creditRecordStatic && poolInfo && actionType && (
        <CreditLineSDK
          creditRecord={creditRecord}
          creditRecordStatic={creditRecordStatic}
          creditAvailableAmount={creditAvailableAmount}
          payoffAmount={payoffAmount}
          totalDueAmount={totalDueAmount}
          poolInfo={poolInfo}
          isOpen={modalIsOpen}
          handleClose={handleClose}
          handleApprove={handleApproveSuccess}
          handleSuccess={handleSuccess}
          actionType={actionType}
        />
      )}
    </Box>
  )
}
