import configUtil from '../utils/config'
import request from '../utils/request'
import timeUtil from '../utils/time'

export type EAPayloadType = {
  poolAddress: string
  borrowerWalletAddress?: string
  receivableAddress?: string
  receivableParam?: string
}

export type ApproveInfoType = {
  aprInBps: number
  creditLimit: number
  intervalInDays: number
  receivableAmount: number
  receivableAsset: string
  receivableParam: number | string
  remainingPeriods: number
  tokenDecimal: number
  tokenName: string
  tokenSymbol: string
}

const approve = async (
  payload: EAPayloadType,
  chainId: number,
  checkIsApproved?: () => Promise<boolean>,
) => {
  console.log(chainId)
  const EARejectErrorMessage =
    'Based on your wallet transaction history your application was not approved.'

  try {
    const { data } = await request.post(
      `${configUtil.getEAVerseUrl()}/underwrite`,
      payload,
    )
    const applicationRejectedError = new Error(EARejectErrorMessage, {
      cause: { applicationRejected: true },
    })
    if (data.statusCode >= 500) {
      throw applicationRejectedError
    } else if (data.status) {
      throw applicationRejectedError
    } else if (data.rejectionReason?.length) {
      throw applicationRejectedError
    }

    // @TODO: Make the EA service to make sure the transaction is confirmed
    if (checkIsApproved) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 120; i++) {
        // eslint-disable-next-line no-await-in-loop
        const isApproved = await checkIsApproved()
        if (isApproved) {
          break
        } else {
          // eslint-disable-next-line no-await-in-loop
          await timeUtil.sleep(1000)
        }
      }
    }

    return data as ApproveInfoType

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message ?? EARejectErrorMessage, {
      cause: error.cause,
    })
  }
}

const approveLender = async (
  payload: {
    poolAddress: string
    lenderWalletAddress: string
  },
  chainId: number,
) => {
  console.log(chainId)
  const generalErrorMessage =
    'Sorry, there was an error approving your wallet as a lender.'
  try {
    const { data } = await request.post(
      `${configUtil.getEABaseUrlV1()}/addApprovedLender`,
      payload,
    )
    if (data.statusCode >= 500) {
      throw new Error(
        data.errorMessage ? data.errorMessage[0] : generalErrorMessage,
      )
    } else if (data.status) {
      throw new Error(data.reason[0])
    } else if (data.rejectionReason?.length) {
      throw new Error(data.rejectionReason[0])
    }
    return data as ApproveInfoType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message ?? generalErrorMessage, {
      cause: 'server error',
    })
  }
}

const EAService = {
  approve,
  approveLender,
}
export default EAService
