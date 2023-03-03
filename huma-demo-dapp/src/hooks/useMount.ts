import { useEffect } from 'react'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'
const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

const useMount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      )
    }
  }

  useEffect(() => {
    fn?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useMount
