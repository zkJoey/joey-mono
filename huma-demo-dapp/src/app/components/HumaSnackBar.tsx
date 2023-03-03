import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { setIsSnackBarOpened } from '../store/app.reducers'
import { selectAppState } from '../store/app.selectors'

export function HumaSnackBar() {
  const dispatch = useAppDispatch()
  const { snackBar } = useAppSelector(selectAppState)

  const onClose = () => {
    dispatch(setIsSnackBarOpened({ opened: false }))
  }

  return (
    <Snackbar open={snackBar.opened} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={snackBar.severity}
        sx={{ width: '100%' }}
      >
        {snackBar.message}
      </Alert>
    </Snackbar>
  )
}
