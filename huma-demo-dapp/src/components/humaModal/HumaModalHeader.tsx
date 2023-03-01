/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css } from '@emotion/react'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material'
import React from 'react'

type HumaModalHeaderType = {
  allowBack?: boolean
  children?: React.ReactNode
  hideClose?: boolean
  onBack?: () => void
  onClose: () => void
  title?: React.ReactNode
  height?: number
}

export function HumaModalHeader({
  hideClose,
  allowBack,
  onBack = (): void => {},
  onClose,
  height = 52,
  ...props
}: HumaModalHeaderType): React.ReactElement {
  const theme = useTheme()
  const styles = {
    buttonBackWrapper: css`
      cursor: pointer;
      position: absolute;
      left: ${theme.spacing(2)};
      top: ${theme.spacing(3)};
    `,
    buttonClose: css`
      &:hover {
        stroke: ${theme.palette.grey[200]};
      }
      stroke: ${theme.palette.common.white};
    `,
    buttonCloseWrapper: css`
      cursor: pointer;
      position: absolute;
      right: ${theme.spacing(3)};
      top: ${theme.spacing(3)};
    `,
    headerBand: css`
      height: ${height}px;
    `,
  }

  return (
    <div>
      <div css={styles.headerBand}>
        {props.title}
        {!!allowBack && (
          <div css={styles.buttonBackWrapper} onClick={onBack}>
            <ChevronLeftOutlinedIcon height={16} width={16} />
          </div>
        )}
        {!hideClose && (
          <div css={styles.buttonCloseWrapper} onClick={onClose}>
            <CloseIcon css={styles.buttonClose} height={16} width={16} />
          </div>
        )}
      </div>
      <div>{props.children}</div>
    </div>
  )
}
