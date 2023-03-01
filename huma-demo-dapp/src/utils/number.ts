import { BigNumber, ethers } from 'ethers'
import { isEmpty } from './common'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const formatMoney = (num: number | string | undefined) => {
  if (isEmpty(num) || Number.isNaN(num)) {
    return num
  }
  return formatter.format(Number(num))
}

export const downScale = <T = string>(
  num: string | number | BigNumber,
  decimals?: number,
): T => {
  if (isEmpty(num) || isEmpty(decimals)) {
    return num as T
  }
  const result = ethers.utils.formatUnits(num, decimals)
  if (typeof num === 'number') {
    return Number(result) as T
  }
  return result as T
}

export const upScale = <T = string>(
  num: string | number,
  decimals?: number,
): T => {
  if (isEmpty(num) || isEmpty(decimals)) {
    return num as T
  }
  const result = Number(num) * 10 ** decimals!
  if (typeof num === 'string') {
    return String(result) as T
  }
  return result as T
}

// BigNumber.from needs the parameter to be integer otherwise it will throw error
// Create this help function to make sure passing integer to BigNumber.from
export const toBigNumber = (num: string | number) => {
  try {
    return BigNumber.from(num)
  } catch (e) {
    return BigNumber.from(Number(num).toFixed(0))
  }
}
