import { css } from '@emotion/react'
import { ArrowForward } from '@mui/icons-material'
import { IconButton, ListItem, ListItemText } from '@mui/material'
import React, { ReactElement } from 'react'

import { IconType } from '../../../utilTypes'

interface Props {
  walletIcon: IconType
  walletName: string
  handleConnect: () => void
}

export function ConnectWalletItem({
  walletIcon,
  walletName,
  handleConnect,
}: Props): ReactElement {
  const styles = {
    listItem: css`
      padding-left: 16px;
      height: 80px;
      cursor: pointer;
      transition: box-shadow 0.5s;
      &:hover {
        box-shadow: 0px 0px 24px rgb(0 0 0 / 8%);
      }
    `,
    listItemText: {
      fontSize: '1.2rem',
      marginLeft: '20px',
    },
    walletIcon: {
      width: '35px',
      height: '35px',
    },
    iconButton: css`
      &:hover {
        background-color: unset;
      }
    `,
  }

  return (
    <ListItem
      onClick={handleConnect}
      css={styles.listItem}
      disablePadding
      secondaryAction={
        <IconButton edge='end' css={styles.iconButton}>
          <ArrowForward
            sx={{
              fontSize: '2rem',
              color: 'primary.main',
            }}
          />
        </IconButton>
      }
    >
      {React.createElement(walletIcon, styles.walletIcon)}
      <ListItemText
        primary={walletName}
        primaryTypographyProps={styles.listItemText}
      />
    </ListItem>
  )
}
