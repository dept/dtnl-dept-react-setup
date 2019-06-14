import { FC, memo } from 'react'
import { animated, useSpring } from 'react-spring/web.cjs'

import { useMeasure, usePrevious } from '@/utils/hooks'

interface Props {
  isOpen?: boolean
  maxHeight?: number
}

export const Collapse: FC<Props> = memo(({ children, maxHeight, isOpen = false }) => {
  const previous = usePrevious(isOpen)

  const { ref, bounds } = useMeasure()
  const { height: elementHeight } = bounds

  const { height, opacity, overflow }: any = useSpring({
    from: {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
    },
    enter: {
      overflow: 'hidden',
      height: 0,
      opacity: 0,
    },
    to: [
      {
        height: isOpen ? elementHeight : 0,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
      },
      {
        overflow: isOpen ? 'initial' : 'hidden',
      },
    ],
  } as any)

  return (
    <animated.div
      style={{
        overflow,
        opacity,
        height: isOpen && previous === isOpen ? maxHeight || 'auto' : height,
      }}>
      <animated.div ref={ref}>{children}</animated.div>
    </animated.div>
  )
})
