import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  Box,
  Button,
  css,
  Divider,
  Input,
  Slider,
  useTheme,
} from '@mui/material'
import React from 'react'
import { useMQ } from '../../../hooks/useMQ'
import { IconType } from '../../../utilTypes'
import { WrapperModal } from './WrapperModal'

type Props = {
  title: string
  tokenIcon?: IconType
  description1?: string
  description2?: string
  currentAmount: number
  sliderMax: number
  tokenSymbol: string
  topLeft?: string
  topRight?: string
  downLeft?: string
  downRight?: string
  actionText?: string
  hideTerms?: boolean
  payoffAmount?: number
  type?: 'slider' | 'input'
  handleChangeAmount: (amount: number) => void
  handleAction: () => void
}

export function ChooseAmountModal({
  title,
  tokenIcon,
  description1,
  description2,
  currentAmount,
  sliderMax,
  tokenSymbol,
  topLeft,
  topRight,
  downLeft,
  downRight,
  actionText = 'accept terms',
  payoffAmount,
  hideTerms = false,
  type = 'slider',
  handleChangeAmount,
  handleAction,
}: Props): React.ReactElement {
  const theme = useTheme()
  const { isXsSize } = useMQ()

  const styles = {
    subTitle: css`
      font-family: 'Uni-Neue-Regular';
    `,
    description2: css`
      ${theme.cssMixins.rowCentered};
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      color: #423b46;
      margin-top: 16px;
    `,
    choosenAmountWrapper: css`
      ${theme.cssMixins.rowCentered};
      background: linear-gradient(232.71deg, #a363f4 4.17%, #ff6a8a 178.69%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 10px;
      margin-top: 30px;
    `,
    choosenAmount: css`
      font-size: 32px;
    `,
    choosenAmountSymbol: css`
      font-size: 75%;
      margin-left: 5px;
      letter-spacing: 0.1px;
    `,
    inputAmountWrapper: css`
      margin-bottom: 10px;
      margin-top: 30px;
    `,
    inputAmount: css`
      ${theme.cssMixins.rowSpaceBetweened};
    `,
    inputField: css`
      width: 100%;
    `,
    maxButton: css`
      width: 80px;
    `,
    amountAvailable: css`
      ${theme.cssMixins.rowVCentered};
      margin-top: 5px;
      margin-bottom: 100px;
      font-size: 16px;
      & > svg {
        margin-right: 5px;
      }
    `,
    tokenIcon: {
      width: '16px',
      height: '16px',
    },
    editIcon: css`
      color: ${theme.palette.primary.main};
      cursor: pointer;
      display: inline-grid;
      vertical-align: middle;
      & > svg {
        font-size: 24px;
      }
      & > svg:first-of-type {
        margin-bottom: -10px;
      }
    `,
    input: css`
      font-size: 18px;
      -webkit-text-fill-color: ${theme.palette.primary.main};
    `,
    slider: css`
      margin-bottom: 54px;
      &.MuiSlider-root {
        height: 8px !important;
        color: #e9e9e9;
      }
      & .MuiSlider-track {
        height: 8px !important;
        background: linear-gradient(232.71deg, #a363f4 4.17%, #ff6a8a 178.69%);
        border-radius: 8px;
      }
      & .MuiSlider-thumb::before {
        background: #ffffff;
        border: 1px solid #f9f9f9;
        box-shadow: 1px 1px 12px 2px rgba(163, 100, 244, 0.6);
        border-radius: 50px;
        width: 24px;
        height: 24px;
      }
    `,
    info: css`
      ${theme.cssMixins.rowSpaceBetweened};
      font-weight: 400;
      font-size: 16px;
      color: #423b46;
    `,
    divider: css`
      margin: 16px 0;
      background: #49505b;
      border-color: #e9e3f1;
    `,
    okButton: css`
      width: 100%;
      position: absolute;
      bottom: ${isXsSize ? 20 : 0}px;
    `,
    terms: css`
      ${theme.cssMixins.rowHCentered};
      font-weight: 400;
      font-size: 12px;
      color: #a8a1b2;
      margin-top: 8px;
      letter-spacing: 0px;
      width: 100%;
      position: absolute;
      bottom: -22px;
    `,
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    handleChangeAmount(newValue as number)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    // @ts-ignore
    handleChangeAmount(event.target.value)
  }

  const handleSetMax = () => {
    handleChangeAmount(sliderMax)
  }

  const handleIncrement = () => {
    const newAmount = currentAmount + 1
    if (newAmount <= sliderMax) {
      handleChangeAmount(newAmount)
    }
  }

  const handleDecrement = () => {
    const newAmount = currentAmount - 1
    if (newAmount >= 0) {
      handleChangeAmount(newAmount)
    }
  }

  const handlePayoff = () => {
    if (payoffAmount) {
      handleChangeAmount(payoffAmount)
    }
  }

  const subTitle = (
    <Box component='span'>
      <Box component='span' css={styles.subTitle}>
        {description1}
      </Box>
      {payoffAmount && (
        <Button
          sx={{ fontSize: '12px' }}
          variant='text'
          size='small'
          onClick={handlePayoff}
          className='choose-amount-modal-select-payoff-btn'
        >
          Pay Off
        </Button>
      )}
    </Box>
  )

  return (
    <WrapperModal title={title} subTitle={subTitle}>
      {type === 'slider' && (
        <>
          <Box css={styles.choosenAmountWrapper}>
            <Box css={styles.choosenAmount}>
              {currentAmount.toFixed(2)}
              <Box component='span' css={styles.choosenAmountSymbol}>
                {tokenSymbol}
              </Box>
              <Box component='span' css={styles.editIcon}>
                <ArrowDropUpIcon
                  onClick={handleIncrement}
                  className='choose-amount-modal-increment-icon'
                />
                <ArrowDropDownIcon onClick={handleDecrement} />
              </Box>
            </Box>
          </Box>
          <Slider
            max={sliderMax}
            min={0}
            css={styles.slider}
            aria-label='Amount'
            value={currentAmount}
            onChange={handleSliderChange}
          />
        </>
      )}
      {type === 'input' && (
        <Box css={styles.inputAmountWrapper}>
          <Box css={styles.inputAmount}>
            <Input
              css={styles.inputField}
              type='number'
              value={currentAmount}
              onChange={handleInputChange}
            />
            <Button
              variant='contained'
              css={styles.maxButton}
              onClick={handleSetMax}
            >
              Max
            </Button>
          </Box>
          <Box css={styles.amountAvailable}>
            {tokenIcon && React.createElement(tokenIcon, styles.tokenIcon)}
            <Box>{sliderMax.toFixed(2)} Available</Box>
          </Box>
        </Box>
      )}
      <Box css={styles.info}>
        <Box>{topLeft}</Box>
        <Box>{topRight}</Box>
      </Box>
      {topLeft && downLeft && <Divider css={styles.divider} />}
      <Box css={styles.info}>
        <Box>{downLeft}</Box>
        <Box>{downRight}</Box>
      </Box>
      <Box css={styles.description2}>{description2}</Box>
      <Button
        className='choose-amount-modal-action-btn'
        variant='contained'
        css={styles.okButton}
        onClick={handleAction}
        disabled={currentAmount === 0 || currentAmount > sliderMax}
      >
        {actionText.toUpperCase()}
      </Button>
      {!hideTerms && (
        <Box css={styles.terms}>
          By clicking {actionText}, you agree to Huma’s Terms of Service.
        </Box>
      )}
    </WrapperModal>
  )
}
