import { css, useTheme } from '@emotion/react'
import { Box } from '@mui/material'

export function AppFooter() {
  const theme = useTheme()

  const styles = {
    footer: css`
      height: '${theme.cssMixins.appFooterHeight}';
    `,
  }

  return <Box css={styles.footer} />
}
