import { css } from '@mui/material'
import { useMemo } from 'react'
import { useMQ } from '../hooks/useMQ'

import { DonutIcon } from './icons'

export function Background() {
  const { isLgSize, isMdSize, isSmSize, isXsSize } = useMQ()

  const first = useMemo(() => {
    if (isXsSize) {
      return [300, -95, -90]
    }
    if (isSmSize) {
      return [400, -95, -90]
    }
    if (isMdSize) {
      return [500, -95, -90]
    }
    if (isLgSize) {
      return [610, -95, -90]
    }
    return []
  }, [isLgSize, isMdSize, isSmSize, isXsSize])

  const second = useMemo(() => {
    if (isXsSize) {
      return [350, 300, -140]
    }
    if (isSmSize) {
      return [520, 200, -195]
    }
    if (isMdSize) {
      return [600, 120, -230]
    }
    if (isLgSize) {
      return [753, 60, -290]
    }
    return []
  }, [isLgSize, isMdSize, isSmSize, isXsSize])

  const third = useMemo(() => {
    if (isXsSize) {
      return [200, 150, 150]
    }
    if (isSmSize) {
      return [260, 100, 200]
    }
    if (isMdSize) {
      return [300, 50, 250]
    }
    if (isLgSize) {
      return [390, 0, 300]
    }
    return []
  }, [isLgSize, isMdSize, isSmSize, isXsSize])

  const styles = {
    firstDonut: css`
      position: absolute;
      width: ${first[0]}px;
      height: ${first[0]}px;
      top: ${first[1]}px;
      right: ${first[2]}px;
    `,
    secondDonut: css`
      position: absolute;
      width: ${second[0]}px;
      height: ${second[0]}px;
      top: ${second[1]}px;
      left: ${second[2]}px;
    `,
    thirdDonut: css`
      position: absolute;
      width: ${third[0]}px;
      height: ${third[0]}px;
      bottom: ${third[1]}px;
      right: 25%;
    `,
  }

  return (
    <>
      <DonutIcon css={styles.firstDonut} />
      <DonutIcon css={styles.secondDonut} />
      <DonutIcon css={styles.thirdDonut} />
    </>
  )
}
