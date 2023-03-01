export enum CL_BORROW_STEP {
  Terms = 0,
  Loan = 1,
  ApproveAllowance = 2,
  TransferMoney = 3,
  Done = 4,
  Error = 5,
}

export enum CL_PAYMENT_STEP {
  Payback = 0,
  ApproveAllowance = 1,
  TransferMoney = 2,
  Done = 3,
  Error = 4,
}

export type CreditLineState = {
  borrowStep: CL_BORROW_STEP
  paymentStep: CL_PAYMENT_STEP
  requestLoan?: number
  requestLoanNet?: number
  chargedFees?: number
  allowanceApproved?: boolean
  paymentAmount?: number
  errorReason?: string
  errorMessage?: string
}

export const initialCLState: CreditLineState = {
  borrowStep: CL_BORROW_STEP.Terms,
  paymentStep: CL_PAYMENT_STEP.Payback,
}
