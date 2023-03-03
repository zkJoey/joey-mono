export enum LEND_SUPPLY_STEP {
  ApproveLender = 0,
  ChooseAmount = 1,
  ApproveAllowance = 2,
  TransferMoney = 3,
  Done = 4,
  Error = 5,
}

export enum LEND_WITHDRAW_STEP {
  CheckingWithdrawable = 0,
  ChooseAmount = 1,
  TransferMoney = 2,
  Done = 3,
  Error = 4,
}

export type LendState = {
  supplyStep: LEND_SUPPLY_STEP
  withdrawStep: LEND_WITHDRAW_STEP
  errorMessage?: string
  supplyAmount?: number
  withdrawAmount?: number
}

export const initialLendState: LendState = {
  supplyStep: LEND_SUPPLY_STEP.ApproveLender,
  withdrawStep: LEND_WITHDRAW_STEP.CheckingWithdrawable,
}
