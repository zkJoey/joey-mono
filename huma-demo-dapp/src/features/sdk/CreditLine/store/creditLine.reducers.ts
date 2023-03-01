import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  CL_BORROW_STEP,
  CL_PAYMENT_STEP,
  initialCLState,
} from './creditLine.store'

export const creditLineSlice = createSlice({
  name: 'creditLine',
  initialState: initialCLState,
  reducers: {
    resetAfterSuccess: (state) => {
      state.errorReason = ''
      state.errorMessage = ''
      state.borrowStep = CL_BORROW_STEP.Terms
      state.paymentStep = CL_PAYMENT_STEP.Payback
      state.requestLoan = undefined
      state.chargedFees = undefined
      state.allowanceApproved = undefined
      state.paymentAmount = undefined
    },
    setCLBorrowStep: (state, { payload }: PayloadAction<CL_BORROW_STEP>) => {
      state.borrowStep = payload
    },
    setCLBorrowNextStep: (state) => {
      state.borrowStep += 1
    },
    setCLBorrowError: (
      state,
      {
        payload,
      }: PayloadAction<{ errorMessage: string; errorReason?: string }>,
    ) => {
      state.errorReason = payload.errorReason
      state.errorMessage = payload.errorMessage
      state.borrowStep = CL_BORROW_STEP.Error
    },
    setCLBorrowAmount: (
      state,
      {
        payload,
      }: PayloadAction<{
        requestLoan: number
        chargedFees: number
        step: CL_BORROW_STEP
      }>,
    ) => {
      state.requestLoan = payload.requestLoan
      state.chargedFees = payload.chargedFees
      state.requestLoanNet = payload.requestLoan - payload.chargedFees
      state.borrowStep = payload.step
    },
    setCLBorrowAllowanceApprove: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.allowanceApproved = payload
    },
    setCLPaymentStep: (state, { payload }: PayloadAction<CL_PAYMENT_STEP>) => {
      state.paymentStep = payload
    },
    setCLPaymentAmount: (state, { payload }: PayloadAction<number>) => {
      state.paymentAmount = payload
    },
    setCLPaymentNextStep: (state) => {
      state.paymentStep += 1
    },
    setCLPaymentError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload
      state.paymentStep = CL_PAYMENT_STEP.Error
    },
  },
})

export const {
  setCLBorrowStep,
  setCLBorrowNextStep,
  setCLBorrowAmount,
  setCLBorrowError,
  resetAfterSuccess,
  setCLBorrowAllowanceApprove,
  setCLPaymentStep,
  setCLPaymentAmount,
  setCLPaymentNextStep,
  setCLPaymentError,
} = creditLineSlice.actions

export default creditLineSlice.reducer
