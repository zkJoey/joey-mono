import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Button, css, Tooltip, Typography, useTheme } from '@mui/material'
import React from 'react'

import { SorryIcon } from '../../../components/icons'

type Props = {
  title: string
  errorReason?: string
  errorMessage?: string
  handleOk: () => void
  okText?: string
}

export function ErrorModal({
  title,
  errorReason,
  errorMessage,
  handleOk,
  okText = 'OKAY',
}: Props): React.ReactElement {
  const theme = useTheme()
  if (!errorReason) {
    errorReason = 'Oops! Something went wrong'
  }

  const styles = {
    wrapper: css`
      height: 518px;
      position: relative;
    `,
    header: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: -5px;
    `,
    sorry: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: 67px;
    `,
    content: css`
      width: 100%;
      display: inline-table;
      padding: 16px 0;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #d32f2f;
      border-radius: 4px;
      position: relative;
      margin-top: 30px;
      height: 79px;
    `,
    errorIcon: css`
      position: absolute;
      font-size: 20px;
      color: #d32f2f;
      margin: 0 15px;
    `,
    messageWrapper: css`
      color: #541313;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      padding-left: 50px;
    `,
    errorMessage: css`
      margin-top: 4px;
      font-size: 14px;
      font-family: 'Uni-Neue-Regular';
      color: #541313;
      cursor: pointer;
      display: -webkit-box;
      line-height: 16px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 20px;
    `,
    okButton: css`
      & .MuiButtonBase-root {
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    `,
  }

  return (
    <Box css={styles.wrapper}>
      <Typography variant='h6' css={styles.header}>
        {title}
      </Typography>
      <Box css={styles.sorry}>
        <SorryIcon />
      </Box>
      <Box css={styles.content}>
        <ErrorOutlineIcon css={styles.errorIcon} />
        <Box css={styles.messageWrapper}>
          <Box>{errorReason}</Box>
          <Tooltip title={errorMessage} placement='top'>
            <Box css={styles.errorMessage}>{errorMessage}</Box>
          </Tooltip>
        </Box>
      </Box>
      <Box css={styles.okButton}>
        <Button variant='contained' onClick={handleOk}>
          {okText}
        </Button>
      </Box>
    </Box>
  )
}
