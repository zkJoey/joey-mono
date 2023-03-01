import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'
import { useContractFunction } from '../../../hooks/useContractFunction'
import useMount from '../../../hooks/useMount'
import { usePoolContract } from '../../../hooks/usePoolContract'
import { useAppDispatch } from '../../../hooks/useRedux'
import { PoolInfoType } from '../../../utils/pool'
import { TxStateType } from '../../../utils/transaction'
import { LoadingModal } from './LoadingModal'

type Props = {
  poolInfo: PoolInfoType
  method: string
  params: unknown[]
  handleSuccess: () => void
  title?: string
}

export function TransferModal({
  poolInfo,
  title,
  method,
  params,
  handleSuccess,
}: Props): React.ReactElement {
  const dispatch = useAppDispatch()
  const { provider } = useWeb3React()
  const poolContract = usePoolContract(poolInfo.poolName, poolInfo.poolType)
  const { state, send } = useContractFunction((state) => state)

  useEffect(() => {
    if (state === TxStateType.Success) {
      handleSuccess()
    }
  }, [dispatch, handleSuccess, state])

  useMount(() => {
    send(poolContract!, method, params, provider)
  })

  return (
    <LoadingModal
      title={title ?? 'Transaction Pending'}
      description='Waiting for confirmation...'
    />
  )
}
