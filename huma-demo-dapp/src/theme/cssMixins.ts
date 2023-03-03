import { css, SerializedStyles } from '@emotion/react'
import { createTheme } from '@mui/material'

import { coreThemeConstants } from './coreThemeConstants'

const theme = createTheme({
  spacing: coreThemeConstants.spacingBase,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any)

export const cssMixins = {
  appHeaderHeight: '80px',
  appFooterHeight: '80px',
  colCentered: css`
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  colHCentered: css`
    flex-direction: column;
    display: flex;
    justify-content: center;
  `,
  colStretch: css`
    display: flex;
    flex-direction: column;
  `,
  colVCentered: css`
    flex-direction: column;
    align-items: center;
    display: flex;
  `,
  rowCentered: css`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  rowHCentered: css`
    display: flex;
    justify-content: center;
  `,
  rowStretch: css`
    display: flex;
  `,
  rowSpaceBetweened: css`
    display: flex;
    justify-content: space-between;
  `,
  rowFlexEnd: css`
    justify-content: flex-end;
    display: flex;
  `,
  rowVCentered: css`
    align-items: center;
    display: flex;
  `,
  spaceSimpleH: (spacing: number): SerializedStyles => css`
    margin-right: ${theme.spacing(spacing)};

    &:last-child {
      margin-right: 0;
    }
  `,
  spaceSimpleV: (spacing: number): SerializedStyles => css`
    margin-bottom: ${theme.spacing(spacing)};

    &:last-child {
      margin-bottom: 0;
    }

    + & {
      margin-top: ${theme.spacing(spacing)};
    }
  `,
  stretchAll: css`
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  stretchBottom: css`
    right: 0;
    bottom: 0;
    left: 0;
  `,
  stretchTop: css`
    top: 0;
    right: 0;
    left: 0;
  `,
}
