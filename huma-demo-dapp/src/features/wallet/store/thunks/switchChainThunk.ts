import { AppActionThunk } from '../../../../store'
import { getAddChainParameters } from '../../../../utils/chain'
import { setIsSnackBarOpened } from '../../../../app/store/app.reducers'
import { SnackBarType } from '../../../../app/store/app.store'
import { selectWalletState } from '../wallet.selectors'
import { ProviderType } from '../wallet.store'

export const switchChainThunk: AppActionThunk<Promise<void>> =
  (desiredChainId: number, provider: ProviderType) =>
  async (dispatch, getState) => {
    const { connectors } = selectWalletState(getState())
    const connector = connectors[provider]

    const getSnackBar = (e: Error) => {
      const snackBar: SnackBarType = {
        opened: true,
        severity: 'error',
        message:
          e?.message || 'Something wrong happened while switching network.',
      }
      return snackBar
    }

    connector
      .activate(getAddChainParameters(desiredChainId))
      .then()
      .catch((e: Error) => {
        console.log(e)
        dispatch(setIsSnackBarOpened(getSnackBar(e)))
      })
  }
