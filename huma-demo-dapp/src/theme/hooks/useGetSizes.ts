import { Theme, useMediaQuery } from '@mui/material'

type UseGetSizesType = {
  isAboveSm: boolean
  isBelowLgSize: boolean
  isBelowMdSize: boolean
  isBelowXsSize: boolean
  isLgSize: boolean
  isMediumSize: boolean
  isMobileDisplay: boolean
  isXsSize: boolean
}

export function useGetSizes(theme: Theme): UseGetSizesType {
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('md'))
  const isLgSize = useMediaQuery(theme.breakpoints.up('lg'))
  const isBelowLgSize = useMediaQuery(theme.breakpoints.down('lg'))
  const isXsSize = useMediaQuery(theme.breakpoints.down('sm'))
  const isAboveSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isBelowXsSize = useMediaQuery(theme.breakpoints.down('xs'))
  const isBelowMdSize = useMediaQuery(theme.breakpoints.down('md'))
  const isMediumSize = isMobileDisplay && isAboveSm

  return {
    isAboveSm,
    isBelowLgSize,
    isBelowMdSize,
    isBelowXsSize,
    isLgSize,
    isMediumSize,
    isMobileDisplay,
    isXsSize,
  }
}
