import { css, useTheme } from '@emotion/react'
import { Box, Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'

import { useHistory } from 'react-router'
import {
  ConnectWalletButton,
  SwitchChainButton,
} from '../../features/wallet/components'
import { HumaFullIcon, HumaIcon } from '../../components/icons'
import { useMQ } from '../../hooks/useMQ'

export function AppHeader() {
  const theme = useTheme()
  const history = useHistory()
  const { isXsSize } = useMQ()

  const styles = {
    appBar: css`
      height: ${theme.cssMixins.appHeaderHeight};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
      margin-left: -40px;
      width: calc(100% + 80px);
      box-shadow: unset;
    `,
    toolBar: css`
      ${theme.cssMixins.rowSpaceBetweened};
      height: ${theme.cssMixins.appHeaderHeight};
      padding-left: 48px !important;
      padding-right: 48px !important;
    `,
    humaLogo: css`
      height: 40px;
      width: auto;
      cursor: pointer;
    `,
  }

  const goToHome = () => {
    history.push('/')
  }

  return (
    <AppBar css={styles.appBar} position='static' color='secondary'>
      <Toolbar css={styles.toolBar}>
        {isXsSize ? (
          <HumaIcon css={styles.humaLogo} onClick={goToHome} />
        ) : (
          <HumaFullIcon css={styles.humaLogo} onClick={goToHome} />
        )}
        <Box>
          <SwitchChainButton />
          <ConnectWalletButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
