import { Box, Button, css, Typography, useTheme } from '@mui/material'
import React from 'react'
import { CheckIcon } from '../../../components/icons'

type Props = {
  content: string[]
  handleAction: () => void
}

export function TxDoneModal({
  content,
  handleAction,
}: Props): React.ReactElement {
  const theme = useTheme()

  const styles = {
    wrapper: css`
      height: 518px;
      position: relative;
    `,
    header: css`
      ${theme.cssMixins.rowHCentered};
      margin-top: -5px;
    `,
    content: css`
      ${theme.cssMixins.colVCentered};
      font-family: 'Uni-Neue-Regular';
      font-size: 18px;
      color: #423b46;
      margin-top: 64px;
      text-align: center;
    `,
    check: css`
      width: 100%;
      ${theme.cssMixins.rowHCentered};
      margin-top: 82px;
    `,
    doneButton: css`
      width: 100%;
      position: absolute;
      bottom: 0;
    `,
  }

  return (
    <Box css={styles.wrapper}>
      <Typography variant='h6' css={styles.header}>
        Transaction Completed
      </Typography>
      <Box css={styles.check}>
        <CheckIcon />
      </Box>
      <Box css={styles.content}>
        {content.map((item) => (
          <Box sx={{ marginTop: '10px' }} key={item}>
            {item}
          </Box>
        ))}
      </Box>
      <Button
        className='transaction-done-modal-close-btn'
        variant='contained'
        css={styles.doneButton}
        onClick={handleAction}
      >
        DONE
      </Button>
    </Box>
  )
}
