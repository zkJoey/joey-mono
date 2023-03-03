import moment from 'moment'
import { isEmpty } from './common'

export const MILLISECONDS = 1000
export const DAY_SECONDS = 24 * 60 * 60
export const TIME_FORMAT_LL = 'll'

export const timestampToStr = (timestamp: number, format: string) =>
  moment.unix(timestamp).format(format)

/**
 * Convert timestamp to format ll: Nov 12, 2022
 *
 * @param timestamp
 * @returns format ll: Nov 12, 2022
 */
export const timestampToLL = (timestamp?: number) => {
  if (!timestamp) {
    return ''
  }
  return timestampToStr(timestamp, TIME_FORMAT_LL)
}

/**
 * get unix time in seconds
 *
 * @returns timestamp
 */
export const getUnixTimestamp = (date?: moment.Moment) => {
  if (date) {
    return date.unix()
  }
  return Math.floor(Date.now() / MILLISECONDS)
}

export const secondsToDays = (seconds: number | undefined) => {
  if (isEmpty(seconds)) {
    return 0
  }
  try {
    return seconds! / DAY_SECONDS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    return 0
  }
}

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const timeUtil = {
  timestampToStr,
  timestampToLL,
  getUnixTimestamp,
  secondsToDays,
  sleep,
}

export default timeUtil
