import { Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { PoolInfo } from '../../../../components/layout/PoolInfo'
import {
  useCLPoolBalance,
  useCLPoolUnderlyingToken,
} from '../../../../hooks/useCLPoolContract'
import { useMQ } from '../../../../hooks/useMQ'
import { routes } from '../../../../Router'
import { isEmpty } from '../../../../utils/common'
import { downScale, formatMoney } from '../../../../utils/number'
import { POOL_NAME, PoolMap } from '../../../../utils/pool'
import { ConnectWalletButton } from '../../../wallet/components'

type Props = {
  poolName: POOL_NAME
}

export function BorrowCreditLinePool({ poolName }: Props): React.ReactElement {
  const { isActive } = useWeb3React()
  const { decimals } = useCLPoolUnderlyingToken(poolName)
  const [creditLinePoolBalance] = useCLPoolBalance(poolName)
  const { isXsSize } = useMQ()

  const items = useMemo(() => {
    const poolBalanceItem = {
      id: 'credit-line-pool-balance',
      title: 'Liquidity',
      value:
        isActive && !isEmpty(creditLinePoolBalance)
          ? formatMoney(downScale(creditLinePoolBalance!, decimals))
          : '--',
      isLoading: isActive && isEmpty(creditLinePoolBalance),
    }
    return [poolBalanceItem]
  }, [creditLinePoolBalance, decimals, isActive])

  const buttons = useMemo(() => {
    if (!isActive) {
      return [
        <ConnectWalletButton text='CONNECT YOUR WALLET' variant='contained' />,
      ]
    }
    return [
      <Button
        variant='contained'
        component={Link}
        to={`${routes.borrowCreditLine.path}?poolName=${poolName}`}
      >
        CHECK YOUR CREDIT LINE
      </Button>,
    ]
  }, [isActive, poolName])

  return (
    <PoolInfo
      id='credit-line-pool-borrow'
      title='Credit Lines'
      description={PoolMap.CreditLine[poolName].borrowDesc}
      items={items}
      buttons={buttons}
      buttonWidth={255}
      infoOneRow={!isXsSize}
    />
  )
}
