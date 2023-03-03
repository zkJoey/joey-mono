import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialAppState, SnackBarType } from './app.store'

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setIsSnackBarOpened: (state, { payload }: PayloadAction<SnackBarType>) => {
      state.snackBar = payload
    },
  },
})

export const { setIsSnackBarOpened } = appSlice.actions

export default appSlice.reducer
