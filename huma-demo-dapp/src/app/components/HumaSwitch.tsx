import { css, useTheme } from '@emotion/react'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import { routes } from '../../Router'

export function HumaSwitch() {
  const theme = useTheme()
  const history = useHistory()
  const { pathname } = useLocation()
  const [checked, setChecked] = useState<'left' | 'right'>()

  useEffect(() => {
    const type =
      pathname === '/' || pathname.startsWith('/borrow') ? 'left' : 'right'
    setChecked(type)
  }, [pathname])

  const uncheckedStyle = {
    color: '#A8A1B2',
    '.MuiBox-root': {
      backgroundClip: 'text',
      textFillColor: 'unset',
    },
    '&:hover': {
      background: '#eae6f0 !important',
    },
  }
  const checkedStyle = {
    background: '#FFFFFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: '32px',
    margin: '2px',
  }

  const styles = {
    wrapper: css`
      width: 100%;
      font-family: 'Uni-Neue-Regular';
      ${theme.cssMixins.rowHCentered}
      position: relative;
      z-index: 1000;
    `,
    buttonWrapper: css`
      ${theme.cssMixins.rowVCentered}
      width: 280px;
      height: 48px;
      background: #eae6f0;
      border-radius: 40px;
      margin: 40px 0;
    `,
    button: css`
      font-size: 1rem;
      border-radius: 40px;
      height: calc(100% - 4px);
      flex: 1;
      ${theme.cssMixins.rowCentered}
      border: none;
      &:hover {
        border: none;
      }
    `,
    left: css`
      ${checked === 'left' ? checkedStyle : uncheckedStyle}
    `,
    right: css`
      ${checked === 'right' ? checkedStyle : uncheckedStyle}
    `,
  }

  const onSwitch = (side: 'left' | 'right') => {
    setChecked(side)
    if (side === 'left') {
      history.push(routes.borrow.path)
    }
    if (side === 'right') {
      history.push(routes.lend.path)
    }
  }

  return (
    <Box css={styles.wrapper}>
      <Box css={styles.buttonWrapper}>
        <Button
          variant='outlined'
          css={css`
            ${styles.button};
            ${styles.left}
          `}
          onClick={() => onSwitch('left')}
        >
          <Box>BORROW</Box>
        </Button>
        <Button
          variant='outlined'
          css={css`
            ${styles.button};
            ${styles.right}
          `}
          onClick={() => onSwitch('right')}
        >
          <Box>EARN</Box>
        </Button>
      </Box>
    </Box>
  )
}
