import { ThemeOptions } from '@mui/material'

// primary
export const primaryPurple = '#c265d0'
export const primaryBlueLight = '#4473EB'
export const primaryGradient =
  'linear-gradient(232.71deg, #A363F4 4.17%, #FF6A8A 178.69%);'

// Secondary
export const pendingBlueDark = '#1148B2'
export const pendingBlue = '#226BF9'
export const pendingBlueMid = '#4584FF'
export const pendingBlueLight = '#79A5FB'
export const warningRed = '#D01638'
export const warningRedMid = '#E71E44'
export const warningRedLight = '#FF4366'
export const warningRedPastel = '#FF708B'
export const backgroundBlue = '#081824'
export const darkBackground = '#0C2436'

export const white = '#FFFFFF'

export const black = {
  1: '#000000',
  2: '#2A252F',
  3: '#423B46',
  4: '#534E59',
  5: '#6B6572',
  6: '#76707E',
}

export const orange = {
  100: '#FFA979',
  300: '#FF8F51',
  500: '#FD792F',
  700: '#E96216',
}

const yellow = {
  100: '#FFECB0',
  300: '#FFE07E',
  500: '#FFD54F',
  700: '#F8BE28',
}

const grey = {
  100: '#CBD6DE',
  200: '#6B6B6B',
  300: '#606060',
  400: '#5E7485',
  600: '#395062',
  700: '#6B6572',
  800: '#4A4A4A',
}

const green = {
  100: '#66F8D3',
  200: '#1DE9B6',
  500: '#00CA97',
  700: '#0DBC90',
}

export const blue = {
  50: '#8AD5FF',
  100: '#3DB9FF',
  200: '#0BA7FE',
  300: '#0095E9',
  500: '#0070AF',
  800: '#013859',
}

export const red = {
  50: '#FEAEA8',
  100: '#FA8B84',
  200: '#EA726A',
  300: '#E75E55',
  500: '#BC4E46',
  800: '#472D33',
}

export const purple = {
  100: '#DEB8FC',
  200: '#C476FF',
  300: '#B452FF',
  500: '#9D3BE8',
  800: '#651C9C',
}

export const paletteCore: ThemeOptions['palette'] = {
  alert: {
    contrastText: black[1],
    dark: yellow[700],
    light: yellow[300],
    main: yellow[500],
  },
  background: {
    default: white,
    paper: white,
  },
  common: {
    black: black[1],
    white,
  },
  default: {
    contrastText: black[1],
    dark: white,
    light: white,
    main: white,
  },
  divider: grey[600],
  error: {
    dark: warningRed,
    light: warningRedPastel,
    main: warningRedLight,
  },
  grey,
  info: {
    contrastText: black[1],
    dark: pendingBlue,
    light: pendingBlueLight,
    main: pendingBlueMid,
    superDark: darkBackground,
    superLight: blue[50],
  },
  mode: 'light',
  primary: {
    main: primaryPurple,
    light: primaryBlueLight,
  },
  secondary: {
    contrastText: black[1],
    main: white,
  },
  success: {
    light: green[100],
    main: green[200],
  },
  text: {
    primary: black[5],
    secondary: black[6],
    tertiary: black[3],
    quaternary: grey[400],
  },
  warning: {
    contrastText: black[1],
    light: orange[100],
    main: orange[500],
    superLight: yellow[100],
  },
}
