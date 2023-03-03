import { Box, css, Typography, useTheme } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  subTitle?: string | React.ReactNode
  children: React.ReactNode
}

export function WrapperModal({
  title,
  subTitle,
  children,
}: Props): React.ReactElement {
  const theme = useTheme()

  const styles = {
    wrapper: css`
      height: 518px;
      position: relative;
    `,
    header: css`
      ${theme.cssMixins.rowHCentered};
      font-family: 'Uni-Neue-Bold';
      font-size: 20px;
      margin-top: -5px;
    `,
    content: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: 30px;
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      line-height: 24px;
      color: #49505b;
    `,
    bottom: css`
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
      {subTitle && <Box css={styles.content}>{subTitle}</Box>}
      {children}
    </Box>
  )
}
