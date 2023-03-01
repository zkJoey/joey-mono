import { RootState } from '../../../../store'

export const selectLendState = (state: RootState) => state.lend
export const selectLendSupplyStep = (state: RootState) =>
  state.creditLine.paymentStep
export const selectLendErrorMessage = (state: RootState) =>
  state.creditLine.errorMessage
