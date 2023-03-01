import { AlertColor } from '@mui/material'

export type SnackBarType = {
  opened: boolean
  severity?: AlertColor
  message?: string
}

export type AppState = {
  snackBar: SnackBarType
}

export const initialAppState: AppState = {
  snackBar: {
    opened: false,
  },
}
