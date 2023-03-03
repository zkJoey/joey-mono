import { Box, css, useTheme } from '@mui/material'
import React from 'react'

import { HumaLoading } from '../../../components/HumaLoading'
import { WrapperModal } from './WrapperModal'

type Props = {
  title: string
  description: string
  hideLoader?: boolean
  children?: React.ReactNode
}

export function LoadingModal({
  title,
  description,
  hideLoader = false,
  children,
}: Props): React.ReactElement {
  const theme = useTheme()

  const styles = {
    loader: css`
      width: 100%;
      ${theme.cssMixins.rowHCentered};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
    <WrapperModal title={title} subTitle={description}>
      {!hideLoader && (
        <Box css={styles.loader}>
          <HumaLoading />
        </Box>
      )}
      <Box css={styles.bottom}>{children}</Box>
    </WrapperModal>
  )
}
