import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  LEND_SUPPLY_STEP,
  LEND_WITHDRAW_STEP,
  initialLendState,
} from './lend.store'

export const lendSlice = createSlice({
  name: 'lend',
  initialState: initialLendState,
  reducers: {
    resetAfterSuccess: (state) => {
      state.errorMessage = ''
      state.supplyStep = LEND_SUPPLY_STEP.ApproveLender
      state.withdrawStep = LEND_WITHDRAW_STEP.CheckingWithdrawable
    },
    setSupplyStep: (state, { payload }: PayloadAction<LEND_SUPPLY_STEP>) => {
      state.supplyStep = payload
    },
    setSupplyNextStep: (state) => {
      state.supplyStep += 1
    },
    setSupplyAmount: (state, { payload }: PayloadAction<number>) => {
      state.supplyAmount = payload
    },
    setSupplyError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload
      state.supplyStep = LEND_SUPPLY_STEP.Error
    },
    setWithdrawStep: (
      state,
      { payload }: PayloadAction<LEND_WITHDRAW_STEP>,
    ) => {
      state.withdrawStep = payload
    },
    setWithdrawNextStep: (state) => {
      state.withdrawStep += 1
    },
    setWithdrawAmount: (state, { payload }: PayloadAction<number>) => {
      state.withdrawAmount = payload
    },
    setWithdrawError: (state, { payload }: PayloadAction<string>) => {
      state.errorMessage = payload
      state.withdrawStep = LEND_WITHDRAW_STEP.Error
    },
  },
})

export const {
  setSupplyStep,
  setSupplyNextStep,
  setSupplyAmount,
  setSupplyError,
  resetAfterSuccess,
  setWithdrawStep,
  setWithdrawNextStep,
  setWithdrawAmount,
  setWithdrawError,
} = lendSlice.actions

export default lendSlice.reducer
