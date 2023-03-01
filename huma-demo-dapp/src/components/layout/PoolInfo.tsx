import { css, useTheme } from '@emotion/react'
import { Box, Grid, Skeleton } from '@mui/material'
import { ReactElement } from 'react'
import { useMQ } from '../../hooks/useMQ'

type Props = {
  title: string
  description: string
  items: {
    id: string
    title: string
    value: string | number | undefined
    isLoading: boolean
  }[]
  buttons: React.ReactNode[]
  buttonWidth: number
  infoOneRow?: boolean
  id?: string
}

export function PoolInfo({
  title,
  description,
  items,
  buttons,
  buttonWidth,
  infoOneRow = false,
  id,
}: Props): ReactElement {
  const theme = useTheme()
  const { isLgSize, isBelowXsSize, isSmSize, isMdSize } = useMQ()
  const firstRowSize = infoOneRow ? 7 : 12
  const secondRowSize = infoOneRow ? 5 : 12

  const styles = {
    wrapper: css`
      width: 100%;
      max-width: 1307px;
      margin: 0 auto;
      padding: ${isBelowXsSize ? 24 : 48}px;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
      border: 1px solid #ffffff;
      border-radius: 24px;
    `,
    title: css`
      font-family: 'Uni-Neue-Regular';
      font-size: ${isLgSize ? 32 : 26}px;
      color: #6b6572;
      margin-bottom: 15px;
    `,
    description: css`
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      letter-spacing: 0.15px;
      color: #6b6572;
    `,
    infoWrapper: css`
      ${theme.cssMixins.rowSpaceBetweened}
    `,
    infoLeft: css`
      ${theme.cssMixins.rowSpaceBetweened}
      flex-direction: ${isSmSize ? 'column' : 'row'};
      justify-content: ${isMdSize ? 'flex-start' : 'space-between'};
      & > div {
        margin-bottom: ${isSmSize ? 20 : 0}px;
        margin-right: ${isMdSize ? 40 : 0}px;
      }
      & > div:last-of-type {
        margin-right: 0px;
        margin-bottom: 0px;
      }
    `,
    infoTitle: css`
      ${theme.cssMixins.rowVCentered}
      font-family: 'Uni-Neue-Bold';
      font-size: ${isLgSize ? 20 : 18}px;
      color: #76707e;
      margin-bottom: 8px;
    `,
    infoContent: css`
      font-family: 'Uni-Neue-Regular';
      font-size: ${isLgSize ? 32 : 26}px;
      color: #6b6572;
    `,
    infoRight: css`
      ${theme.cssMixins.rowFlexEnd}
      width: ${infoOneRow ? 'unset' : '100%'};
    `,
    buttonWrapper: (width: number) => css`
      width: ${infoOneRow ? 'unset' : '100%'};
      margin-right: ${isBelowXsSize ? 16 : 24}px;
      &:last-of-type {
        margin-right: 0;
      }
      & > button,
      & > a {
        height: 42px;
        width: ${infoOneRow ? `${width}px` : '100%'};
      }
    `,
  }

  return (
    <Box css={styles.wrapper} id={id}>
      <Box css={styles.title}>{title}</Box>
      <Box css={styles.description} marginBottom='47px'>
        {description}
      </Box>

      <Grid
        container
        spacing={2}
        columnSpacing={{ md: 10 }}
        justifyContent='space-between'
      >
        <Grid item xs={firstRowSize} md={firstRowSize}>
          <Box css={styles.infoLeft}>
            {items.map((item) => (
              <Box key={item.title} id={item.id}>
                <Box css={styles.infoTitle}>{item.title}</Box>
                {item.isLoading ? (
                  <Skeleton variant='text' width={80} />
                ) : (
                  <Box css={styles.infoContent} className='pool-info-content'>
                    {item.value}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={secondRowSize}
          md={secondRowSize}
          display='flex'
          alignItems='flex-end'
          justifyContent='flex-end'
          width='100%'
        >
          <Box css={styles.infoRight}>
            {buttons.map((button, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} css={styles.buttonWrapper(buttonWidth)}>
                {button}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
