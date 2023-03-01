import { css } from '@emotion/react'
import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

type Props = {
  fullScreen?: boolean
}

export function Error500({ fullScreen = false }: Props): React.ReactElement {
  const theme = useTheme()
  const styles = {
    description: css`
      text-align: center;
    `,
    title: css`
      max-width: 400px;
      text-align: center;
    `,
    wrapper: css`
      ${theme.cssMixins.colCentered};
      padding: ${theme.spacing(fullScreen ? 5 : 2)};
    `,
  }

  return (
    <Box css={styles.wrapper}>
      <Typography css={styles.title} variant='h5'>
        Oops!
      </Typography>
      <Box sx={{ maxWidth: '400px', mt: 2 }}>
        <Typography
          gutterBottom
          paragraph
          color='text.tertiary'
          css={styles.description}
        >
          Something isn&apos;t working quite right, please reload page. If that
          doesn’t let the Huma team know.
        </Typography>
      </Box>
    </Box>
  )
}
