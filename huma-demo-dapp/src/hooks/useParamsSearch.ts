import { useLocation } from 'react-router'
import * as queryString from 'query-string'

export const useParamsSearch = () => {
  const location = useLocation()
  return queryString.parse(location.search)
}
