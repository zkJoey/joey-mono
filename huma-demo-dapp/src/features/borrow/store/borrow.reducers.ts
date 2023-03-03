import { createSlice } from '@reduxjs/toolkit'

import { initialBorrowState } from './borrow.store'

export const borrowSlice = createSlice({
  name: 'borrow',
  initialState: initialBorrowState,
  reducers: {},
})

export default borrowSlice.reducer
