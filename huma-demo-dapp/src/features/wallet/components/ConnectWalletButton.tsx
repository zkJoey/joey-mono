import { css } from '@emotion/react'
import { Box, Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { ReactElement } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { getWalletAddressAbbr } from '../../../utils/chain'
import { setConnectWalletModalOpened } from '../store/wallet.reducers'
import { selectWalletState } from '../store/wallet.selectors'
import { ProviderInfos } from '../store/wallet.store'

type Props = {
  text?: string
  variant?: 'outlined' | 'contained'
}

export function ConnectWalletButton({
  text = 'CONNECT WALLET',
  variant = 'outlined',
}: Props): ReactElement {
  const dispatch = useAppDispatch()
  const { isActive, account } = useWeb3React()
  const { choosenProvider } = useAppSelector(selectWalletState)
  const providerInfo = choosenProvider ? ProviderInfos[choosenProvider] : null

  const styles = {
    providerIcon: {
      height: '18px',
      width: '18px',
    },
    account: css`
      margin-left: 10px;
    `,
    button: css`
      font-family: 'Uni-Neue-Bold';
      letter-spacing: 0.46px;
    `,
  }

  const onClickConnect = () => {
    dispatch(setConnectWalletModalOpened(true))
  }

  if (isActive && account) {
    return (
      <Button variant='outlined' onClick={onClickConnect} css={styles.button}>
        {providerInfo &&
          React.createElement(providerInfo.icon, styles.providerIcon)}
        <Box component='span' css={styles.account}>
          {getWalletAddressAbbr(account)}
        </Box>
      </Button>
    )
  }

  return (
    <Button variant={variant} onClick={onClickConnect} css={styles.button}>
      {text}
    </Button>
  )
}
