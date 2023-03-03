import React from 'react'
import { css } from '@emotion/react'
import { Button, Typography, useTheme } from '@mui/material'

type PpNotFound = {
  fullScreen?: boolean
  minHeight?: string
}

function NotFound({
  fullScreen = false,
  minHeight = '0px',
}: PpNotFound): React.ReactElement {
  const theme = useTheme()
  const styles = css`
    ${theme.cssMixins.colCentered};
    padding: ${theme.spacing(fullScreen ? 5 : 2)};
    min-height: ${fullScreen ? '100vh' : minHeight};
  `
  return (
    <div css={styles}>
      <Typography variant='h5'>404</Typography>
      <Typography gutterBottom paragraph color='text.tertiary'>
        Page not found
      </Typography>
      <Button href='/' sx={{ mt: 4 }} variant='outlined'>
        Go to our home page
      </Button>
    </div>
  )
}

// Needs to be default for lazy load
// eslint-disable-next-line import/no-default-export
export default NotFound
