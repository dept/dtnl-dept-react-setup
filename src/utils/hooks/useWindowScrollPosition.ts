import _throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

interface UseWindowScrollPositionOptions {
  throttle: number
}

const defaultOptions = {
  throttle: 100,
}

const getPosition = () => ({
  x: process.browser ? window.pageXOffset : 0,
  y: process.browser ? window.pageYOffset : 0,
})

export function useWindowScrollPosition(opts: UseWindowScrollPositionOptions = defaultOptions) {
  const [position, setPosition] = useState(getPosition())

  useEffect(() => {
    const handleScroll = _throttle(() => {
      setPosition(getPosition())
    }, opts.throttle)

    if (process.browser) {
      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [opts.throttle])

  return position
}
