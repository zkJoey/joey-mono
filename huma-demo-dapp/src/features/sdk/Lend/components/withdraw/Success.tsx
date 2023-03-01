import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

import transferAbi from '../../../../../abis/Transfer.json'
import { useContractFunction } from '../../../../../hooks/useContractFunction'
import { downScale, formatMoney } from '../../../../../utils/number'
import { PoolInfoType } from '../../../../../utils/pool'
import { decodeLogs } from '../../../../../utils/transaction'
import { TxDoneModal } from '../../../components/TxDoneModal'

type Props = {
  poolInfo: PoolInfoType
  handleAction: () => void
}

export function Success({ poolInfo, handleAction }: Props): React.ReactElement {
  const { account } = useWeb3React()
  const { poolUnderlyingToken } = poolInfo
  const txReceipt = useContractFunction((state) => state.txReceipt)
  const { symbol, decimals, address } = poolUnderlyingToken
  const [withdrawedAmount, setWithdrawedAmount] = useState<string | undefined>()

  useEffect(() => {
    if (txReceipt) {
      const events = decodeLogs(txReceipt.logs, transferAbi)
      if (events) {
        events.forEach((event) => {
          const { from, to, value } = event.args
          if (
            from.toLowerCase() === poolInfo.pool.toLowerCase() &&
            to.toLowerCase() === account?.toLowerCase()
          ) {
            const withdrawedAmount = downScale(value.toString(), decimals)
            setWithdrawedAmount(withdrawedAmount)
          }
        })
      }
    }
  }, [account, address, decimals, poolInfo.pool, txReceipt])

  const content = [
    `You successfully withdrawn ${formatMoney(withdrawedAmount)} ${symbol}.`,
  ]

  return <TxDoneModal handleAction={handleAction} content={content} />
}
