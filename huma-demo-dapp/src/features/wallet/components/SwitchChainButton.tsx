import { css, useTheme } from '@emotion/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { ReactElement, useMemo } from 'react'

import { USDCFaucetButton } from './USDCFaucetButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { CHAINS, SupportedChainIds } from '../../../utils/chain'
import { switchChainThunk } from '../store/thunks/switchChainThunk'
import { selectWalletState } from '../store/wallet.selectors'

export function SwitchChainButton(): ReactElement | null {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { chainId } = useWeb3React()
  const { choosenProvider } = useAppSelector(selectWalletState)
  const chain = useMemo(() => {
    if (!chainId) {
      return null
    }
    if (!CHAINS[chainId]) {
      return { name: 'Unsupported', icon: null }
    }
    return CHAINS[chainId]
  }, [chainId])

  const styles = {
    switchButton: css`
      font-family: 'Uni-Neue-Regular';
      margin-right: 10px;
      color: ${theme.palette.text.primary};
      font-size: 1rem;
    `,
    menuItem: css`
      font-size: 1rem;
    `,
    menuItemIcon: {
      width: '1rem',
      height: '1rem',
    },
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const onClose = (desiredChainId: number) => {
    setAnchorEl(null)
    if (typeof desiredChainId === 'number') {
      dispatch(switchChainThunk(desiredChainId, choosenProvider))
    }
  }

  if (!chainId) {
    return null
  }

  return (
    <>
      <Button
        css={styles.switchButton}
        id='switch-chain-button'
        aria-controls={open ? 'switch-chain-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={onClick}
        startIcon={chain?.name === 'Unsupported' ? <WarningAmberIcon /> : null}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        {chain?.icon && React.createElement(chain.icon, styles.menuItemIcon)}
        <Box component='span' marginLeft='10px'>
          {chain?.name}
        </Box>
      </Button>
      <USDCFaucetButton />
      <Menu
        id='switch-chain-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        disableScrollLock
      >
        {Object.keys(CHAINS)
          .filter((id) => SupportedChainIds.includes(Number(id)))
          .map((id) => {
            const chainItem = CHAINS[Number(id)]
            return (
              <MenuItem
                css={styles.menuItem}
                onClick={() => onClose(Number(id))}
                key={id}
              >
                {React.createElement(chainItem.icon, styles.menuItemIcon)}
                <Box component='span' marginLeft='10px'>
                  {chainItem.name}
                </Box>
              </MenuItem>
            )
          })}
      </Menu>
    </>
  )
}
