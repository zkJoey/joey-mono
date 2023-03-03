import { Button, css } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { ReactElement, useCallback, useEffect, useState } from 'react'

import { HumaModal, HumaModalHeader } from '../../../components/humaModal'
import { useTestERC20Contract } from '../../../hooks/useContract'
import { useContractFunctionTestUSDC } from '../../../hooks/useContractFunctionTestUSDC'
import { usePoolInfo } from '../../../hooks/usePool'
import { downScale } from '../../../utils/number'
import { POOL_NAME, POOL_TYPE } from '../../../utils/pool'
import { TxStateType } from '../../../utils/transaction'
import { ErrorModal, LoadingModal, TxDoneModal } from '../../sdk/components'

type Props = {
  variant?: 'outlined' | 'contained'
}

export function USDCFaucetButton({
  variant = 'outlined',
}: Props): ReactElement {
  const { account, provider } = useWeb3React()
  const poolInfo = usePoolInfo(POOL_NAME.HumaCreditLine, POOL_TYPE.CreditLine)
  const testUSDCContract = useTestERC20Contract(
    poolInfo?.poolUnderlyingToken.address,
  )
  const { loading, state, send, reset, failReason } =
    useContractFunctionTestUSDC((state) => state)
  const [mintSuccess, setMintSuccess] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'Minting' | 'Done' | 'Error'>('Minting')
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (state === TxStateType.Success) {
      setStep('Done')
      setMintSuccess(true)
    }
    if (failReason) {
      setStep('Error')
    }
  }, [failReason, state])

  useEffect(() => {
    const loadBalance = async () => {
      if (testUSDCContract == null || account == null) {
        return
      }
      const balance = await testUSDCContract.balanceOf(account)
      const decimals = await testUSDCContract.decimals()
      setBalance(downScale(balance, decimals))
    }
    setInterval(loadBalance, 2000)
  }, [testUSDCContract, account])

  const styles = {
    faucetButton: css`
      margin-right: 5px;
    `,
    faucetText: css`
      font-family: 'Uni-Neue-Regular';
      font-size: 18px;
      margin-right: 12px;
    `,
  }

  const mintTestTokens = useCallback(() => {
    send(testUSDCContract!, 'give1000To', [account], provider)
  }, [account, testUSDCContract, provider, send])

  const onClickButton = () => {
    setIsOpen(true)
    mintTestTokens()
  }

  const handleCloseModal = () => {
    reset()
    setIsOpen(false)
    if (step !== 'Done') {
      setStep('Minting')
    }
  }

  let text = 'Get Test USDC'
  if (mintSuccess) {
    text = 'Success!'
  } else if (loading) {
    text = 'Waiting...'
  }

  return (
    <>
      <span css={styles.faucetText}>${balance} USDC</span>
      <Button
        css={styles.faucetButton}
        disabled={loading || mintSuccess}
        variant={variant}
        onClick={onClickButton}
      >
        {text}
      </Button>
      <HumaModal
        isOpen={isOpen}
        overflowY='auto'
        onClose={handleCloseModal}
        width='480px'
        padding='30px 40px'
        disableBackdropClick
      >
        <HumaModalHeader onClose={handleCloseModal} height={0} />
        {step === 'Minting' && (
          <LoadingModal
            title='Transaction Pending'
            description='Waiting for confirmation...'
          />
        )}
        {step === 'Done' && (
          <TxDoneModal
            content={['You have successfully minted 1000 test USDC.']}
            handleAction={handleCloseModal}
          />
        )}
        {step === 'Error' && (
          <ErrorModal
            title='Supply'
            errorReason='Sorry there was an error'
            errorMessage={failReason}
            handleOk={handleCloseModal}
          />
        )}
      </HumaModal>
    </>
  )
}
