import { CssBaseline, GlobalStyles } from '@mui/material'
import React from 'react'

import useActiveRoute from '../hooks/useActiveRoute'

export function AppGlobalStyles(): React.ReactElement {
  const activeRoute = useActiveRoute()

  const getBackground = () => {
    if (activeRoute.isRoot) {
      return 'linear-gradient(180deg, #fbfbfc 0%, #fbf0f0 100%)'
    }
    return 'linear-gradient(180deg, #fbf5ec 0%, #ffeded 100%)'
  }

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },

          '*, button:focus': {
            outline: 'none',
          },

          a: {
            '&:hover': {
              textDecoration: 'none',
            },
          },

          body: {
            background: getBackground(),
            height: '100vh',
            letterSpacing: '0.15px',
          },

          '#root': {
            background: getBackground(),
            minHeight: '100vh',
          },

          // Hide input number arrows
          'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
            {
              margin: 0,
              WebkitAppearance: 'none',
            },

          // Firefox Hide input number arrows
          'input[type=number]': {
            MozAppearance: 'textfield',
          },

          '.MuiPickersCalendarHeader-label': {
            fontSize: '16px',
          },
        }}
      />
    </>
  )
}
