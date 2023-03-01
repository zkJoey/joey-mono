/**
 * This file can be used to override default props and styles on the various Material components
 * see: https://mui.com/customization/theme-components/
 */
import { Theme, ThemeOptions } from '@mui/material'

export function components(theme: Theme): ThemeOptions['components'] {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        contained: {
          // align outlined vs contained borders
          border: '1px solid transparent',
          background:
            'linear-gradient(232.71deg, #A363F4 4.17%, #FF6A8A 178.69%)',
        },
        outlined: {
          '.MuiBox-root': {
            background:
              'linear-gradient(232.71deg, #A363F4 4.17%, #FF6A8A 178.69%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          },
        },
        root: {
          fontFamily: 'Uni-Neue-Bold',
          fontSize: '15px',
          borderRadius: '32px',
          '&.MuiButton-containedPrimary': {
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            boxShadow:
              '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
          },
          '&.MuiButton-outlinedPrimary': {
            '&:hover': {
              backgroundColor: theme.palette.common.white,
            },
          },
          textTransform: 'none',
          '&:disabled': {
            border: 'none',
            background: 'rgba(0, 0, 0, 0.12)',
            boxShadow: 'unset',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {},
    },
    MuiCssBaseline: {
      styleOverrides: {
        dd: {
          margin: 0,
        },
        dl: {
          margin: 0,
        },
        dt: {
          margin: 0,
        },
      },
    },
  }
}
