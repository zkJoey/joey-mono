import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useRefresh = (): [
  (targetBlockNumber: number, callback: () => void) => void,
  boolean,
] => {
  const { provider } = useWeb3React()
  const [loading, setLoading] = useState(false)
  const blockNumberRef = useRef<number | undefined>()
  const targetBlockNumberRef = useRef<number | undefined>()
  const callbackRef = useRef<() => void | undefined>()

  // @ts-ignore
  useEffect(() => {
    if (!provider) return () => undefined
    const listener = (latestBlockNumber: number) => {
      try {
        blockNumberRef.current = latestBlockNumber
        if (
          targetBlockNumberRef.current &&
          latestBlockNumber >= targetBlockNumberRef.current
        ) {
          if (callbackRef.current) {
            console.log('target block number', targetBlockNumberRef.current)
            console.log('latest block number', latestBlockNumber)
            callbackRef.current()
            targetBlockNumberRef.current = undefined
            callbackRef.current = undefined
            setLoading(false)
          }
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    provider.on('block', listener)
    return () => provider.removeListener('block', listener)
  }, [provider])

  const subscribe = useCallback(
    (targetBlockNumber: number, callbackFn: () => void) => {
      if (
        blockNumberRef.current &&
        blockNumberRef.current >= targetBlockNumber
      ) {
        callbackFn()
      } else {
        setLoading(true)
        targetBlockNumberRef.current = targetBlockNumber
        callbackRef.current = callbackFn
      }
    },
    [],
  )

  return [subscribe, loading]
}
