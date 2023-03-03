import { RootState } from '../../../../store'

export const selectCLState = (state: RootState) => state.creditLine
export const selectCLPaymentStep = (state: RootState) =>
  state.creditLine.paymentStep
export const selectCLErrorMessage = (state: RootState) =>
  state.creditLine.errorMessage
export const selectCLPaymentAmount = (state: RootState) =>
  state.creditLine.paymentAmount
