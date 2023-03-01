import { Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useMemo, useState } from 'react'

import { PoolInfo } from '../../../../components/layout/PoolInfo'
import {
  useCLLenderApproved,
  useCLLenderPosition,
  useCLPoolBalance,
  useCLPoolUnderlyingToken,
} from '../../../../hooks/useCLPoolContract'
import { useMQ } from '../../../../hooks/useMQ'
import { usePoolInfo } from '../../../../hooks/usePool'
import { useRefresh } from '../../../../hooks/useRefresh'
import { isEmpty } from '../../../../utils/common'
import { downScale, formatMoney } from '../../../../utils/number'
import { POOL_NAME, POOL_TYPE, PoolMap } from '../../../../utils/pool'
import { LendSDK } from '../../../sdk/Lend/components/LendSDK'
import { ConnectWalletButton } from '../../../wallet/components'

type Props = {
  poolName: POOL_NAME
}

export function LendCreditLinePool({ poolName }: Props): React.ReactElement {
  const { isActive, account } = useWeb3React()
  const { isLgSize, isSmSize } = useMQ()
  const poolInfo = usePoolInfo(poolName, POOL_TYPE.CreditLine)
  const { decimals } = useCLPoolUnderlyingToken(poolName)
  const [creditLinePoolBalance, refreshPoolBalance] = useCLPoolBalance(poolName)
  const [lenderPosition, refreshLenderPosition] = useCLLenderPosition(
    poolName,
    account,
  )
  const [lenderApproved, refreshLenderApproved] = useCLLenderApproved(
    poolName,
    account,
  )
  const [actionType, setActionType] = useState<'supply' | 'withdraw'>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [subscribe, loading] = useRefresh()

  const buttonWith = useMemo(() => {
    if (!isActive) {
      return 205
    }
    return isLgSize ? 180 : 132
  }, [isActive, isLgSize])

  const items = useMemo(() => {
    const poolBalanceItem = {
      id: 'credit-line-pool-balance',
      title: 'Total pool balance',
      value:
        isActive && !isEmpty(creditLinePoolBalance)
          ? formatMoney(downScale(creditLinePoolBalance!, decimals))
          : '--',
      isLoading: (isActive && isEmpty(creditLinePoolBalance)) || loading,
    }
    const estApyItem = {
      id: 'credit-line-pool-apy',
      title: 'Est APY',
      value: '10-20%',
      isLoading: false,
    }
    const positionItem = {
      id: 'credit-line-pool-position',
      title: 'Your Position',
      value:
        isActive && !isEmpty(lenderPosition)
          ? formatMoney(downScale(lenderPosition!, decimals))
          : '--',
      isLoading: (isActive && isEmpty(lenderPosition)) || loading,
    }
    return [poolBalanceItem, estApyItem, positionItem]
  }, [creditLinePoolBalance, decimals, isActive, lenderPosition, loading])

  const handleSupply = () => {
    setModalIsOpen(true)
    setActionType('supply')
  }

  const handleWithDraw = () => {
    setModalIsOpen(true)
    setActionType('withdraw')
  }

  const buttons = useMemo(() => {
    if (!isActive) {
      return [
        <ConnectWalletButton text='CONNECT YOUR WALLET' variant='contained' />,
      ]
    }
    return [
      <Button
        variant='outlined'
        onClick={handleWithDraw}
        disabled={lenderPosition?.lte(0)}
      >
        WITHDRAW
      </Button>,
      <Button variant='contained' onClick={handleSupply}>
        SUPPLY {poolInfo?.poolUnderlyingToken.symbol}
      </Button>,
    ]
  }, [isActive, lenderPosition, poolInfo?.poolUnderlyingToken.symbol])

  const handleClose = () => {
    setModalIsOpen(false)
    setActionType(undefined)
  }

  const handleApproveSuccess = useCallback(() => {
    refreshLenderApproved()
  }, [refreshLenderApproved])

  const handleSuccess = useCallback(
    (blockNumber: number) => {
      const callbackFn = () => {
        refreshPoolBalance()
        refreshLenderPosition()
      }
      subscribe(blockNumber, callbackFn)
    },
    [refreshLenderPosition, refreshPoolBalance, subscribe],
  )

  return (
    <>
      <PoolInfo
        id='credit-line-pool-lend'
        title='Credit Lines'
        description={PoolMap.CreditLine[poolName].lendDesc}
        items={items}
        buttons={buttons}
        buttonWidth={buttonWith}
        infoOneRow={!isSmSize}
      />
      {poolInfo && actionType && !isEmpty(lenderApproved) && (
        <LendSDK
          lenderPosition={lenderPosition}
          lenderApproved={lenderApproved!}
          poolInfo={poolInfo}
          isOpen={modalIsOpen}
          handleClose={handleClose}
          handleApprove={handleApproveSuccess}
          handleSuccess={handleSuccess}
          actionType={actionType}
        />
      )}
    </>
  )
}
