import React from 'react'
import { css } from '@emotion/react'
import {
  CircularProgress,
  CircularProgressProps,
  useTheme,
} from '@mui/material'

type Props = {
  fullScreen?: boolean
  minHeight?: string
} & CircularProgressProps

export function Loading({
  fullScreen = false,
  minHeight = '0px',
  ...circularProps
}: Props): React.ReactElement {
  const theme = useTheme()
  const styles = css`
    ${theme.cssMixins.rowCentered};
    min-height: ${fullScreen ? '100vh' : minHeight};
  `
  return (
    <div css={styles}>
      <CircularProgress color='secondary' {...circularProps} />
    </div>
  )
}
