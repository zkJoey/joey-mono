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
  const [supplyedAmount, setSupplyedAmount] = useState<string | undefined>()

  useEffect(() => {
    if (txReceipt) {
      const events = decodeLogs(txReceipt.logs, transferAbi)
      if (events) {
        events.forEach((event) => {
          const { from, to, value } = event.args
          if (
            from.toLowerCase() === account?.toLowerCase() &&
            to.toLowerCase() === poolInfo.pool.toLowerCase()
          ) {
            const supplyedAmount = downScale(value.toString(), decimals)
            setSupplyedAmount(supplyedAmount)
          }
        })
      }
    }
  }, [account, address, decimals, poolInfo.pool, txReceipt])

  const content = [
    `You successfully supplied ${formatMoney(supplyedAmount)} ${symbol}.`,
  ]

  return <TxDoneModal handleAction={handleAction} content={content} />
}
