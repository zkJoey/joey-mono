import { css } from '@emotion/react'
import { useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { LoaderIcon } from './icons'

type Props = {
  fullScreen?: boolean
  minHeight?: string
}

export function HumaLoading({
  fullScreen = false,
  minHeight = '0px',
}: Props): React.ReactElement {
  const theme = useTheme()
  const pathLength = 45
  const [count, setCount] = useState(1)
  const intervalTime = 30

  useEffect(() => {
    const interval = setInterval(() => {
      if (count <= pathLength) {
        const element = document.querySelector(
          `#huma-loader-wrapper > svg > path:nth-of-type(${count})`,
        )
        // @ts-ignore
        element!.style.visibility = 'visible'
        setCount((pre) => pre + 1)
      } else {
        const elements = document.querySelectorAll(
          `#huma-loader-wrapper > svg > path`,
        )
        // @ts-ignore
        elements!.forEach((element) => {
          // @ts-ignore
          element!.style.visibility = 'hidden'
        })
        setCount(1)
      }
    }, intervalTime)
    return () => clearInterval(interval)
  }, [count])

  const styles = {
    wrapper: css`
      ${theme.cssMixins.rowCentered};
      min-height: ${fullScreen ? '100vh' : minHeight};
      width: 50px;
      height: 50px;
    `,
    icon: css`
      & > path {
        visibility: hidden;
      }
    `,
  }

  return (
    <div css={styles.wrapper} id='huma-loader-wrapper'>
      <LoaderIcon css={styles.icon} />
    </div>
  )
}
