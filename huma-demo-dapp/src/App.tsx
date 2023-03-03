import './App.css'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'

import { AppFooter } from './app/components/AppFooter'
import { AppHeader } from './app/components/AppHeader'
import { HumaSnackBar } from './app/components/HumaSnackBar'
import { HumaSwitch } from './app/components/HumaSwitch'
import { ErrorBoundary } from './components/humError'
import { AppContainer } from './components/layout'
import { Loading } from './components/Loading'
import { Web3Provider } from './components/Web3Provider'
import { ConnectWalletModal } from './features/wallet/components'
import Router from './Router'
import { AppGlobalStyles } from './theme/AppGlobalStyles'
import { Web3ProviderListener } from './components/Web3ProviderListener'

function App() {
  return (
    <AppContainer>
      <Web3Provider>
        <Web3ProviderListener>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HashRouter>
              <AppGlobalStyles />
              <AppHeader />
              <ConnectWalletModal />
              <HumaSwitch />
              <HumaSnackBar />
              <ErrorBoundary>
                <Suspense fallback={<Loading fullScreen />}>
                  <Router />
                </Suspense>
              </ErrorBoundary>
              <AppFooter />
            </HashRouter>
          </LocalizationProvider>
        </Web3ProviderListener>
      </Web3Provider>
    </AppContainer>
  )
}

export default App
