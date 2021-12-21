import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import { useMeasure } from '@/utils/hooks';

interface Props {
  isOpen?: boolean;
  maxHeight?: number;
  children: ReactNode;
}

const duration = 300;

export function Collapse({ children, isOpen = false }: Props) {
  const { ref, bounds } = useMeasure();
  const { height: elementHeight } = bounds;

  function getHeight(state: TransitionStatus) {
    switch (state) {
      case 'entered':
        return 'auto';
      case 'entering':
        return elementHeight;
      case 'exiting':
        return elementHeight;
      default:
        return '0px';
    }
  }

  function getOpacity(state: TransitionStatus) {
    switch (state) {
      case 'entered':
        return 1;
      case 'entering':
        return 1;
      case 'exiting':
        return 1;
      default:
        return 0;
    }
  }

  return (
    <>
      <Transition in={isOpen} timeout={duration}>
        {state => {
          return (
            <Box
              sx={{
                overflow: 'hidden',
                transition: `opacity ${duration}ms, height ${duration}ms`,
                transitionTimingFunction: `cubic-bezier(0.77, 0, 0.175, 1)`,
                opacity: getOpacity(state),
                height: getHeight(state),
              }}
            >
              <div ref={ref}>{children}</div>
            </Box>
          );
        }}
      </Transition>
    </>
  );
}
