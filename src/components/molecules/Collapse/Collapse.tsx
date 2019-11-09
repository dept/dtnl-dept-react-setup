import { FC } from 'react'
import { Transition } from 'react-transition-group'

import { useMeasure } from '@/utils/hooks'

interface Props {
  isOpen?: boolean
  maxHeight?: number
}

export const Collapse: FC<Props> = ({ children, isOpen = false }) => {
  const duration = 300

  const { ref, bounds } = useMeasure()
  const { height: elementHeight } = bounds

  const transitionStyles = {
    entering: { opacity: 1, height: elementHeight, overflow: 'hidden' },
    entered: { opacity: 1, height: 'auto' },
    exiting: { opacity: 1, height: elementHeight, overflow: 'hidden' },
    exited: { opacity: 0, height: 0, overflow: 'hidden' },
  }

  const defaultStyle = {
    transition: `opacity ${duration}ms 100ms, height ${duration}ms ease-out`,
  }

  return (
    <>
      <Transition in={isOpen} timeout={duration}>
        {state => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state as keyof typeof transitionStyles],
            }}>
            <div ref={ref}>{children}</div>
          </div>
        )}
      </Transition>
    </>
  )
}
