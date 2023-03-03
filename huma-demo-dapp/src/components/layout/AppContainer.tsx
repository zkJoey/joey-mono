import { css } from '@emotion/react'
import { ReactElement } from 'react'
import { useMQ } from '../../hooks/useMQ'

import { WCProps } from '../../utilTypes'

export function AppContainer({ children }: WCProps): ReactElement {
  const { isSmSize, isBelowXsSize } = useMQ()

  const getPadding = () => {
    if (isBelowXsSize) {
      return 16
    }
    if (isSmSize) {
      return 32
    }
    return 40
  }

  const styles = css`
    margin-left: 0px;
    padding-bottom: 20px;
    overflow-x: hidden;
    padding: 0 ${getPadding()}px;
  `

  return <div css={styles}>{children}</div>
}
