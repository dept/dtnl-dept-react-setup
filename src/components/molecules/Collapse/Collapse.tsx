import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { useMeasure } from '@/utils/hooks';

interface Props {
  isOpen?: boolean;
  maxHeight?: number;
}

const duration = 300;

const CollapseWrapper = styled.div<{ height: number }>`
  overflow: hidden;
  transition: opacity ${duration}ms 100ms, height ${duration}ms;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  opacity: 0;
  height: 0px;

  &.collapse-enter {
    opacity: 0;
    height: 0px;
  }
  &.collapse-enter-active {
    opacity: 1;
    height: ${props => props.height}px;
  }
  &.collapse-enter-done {
    opacity: 1;
    height: auto;
    overflow: auto;
  }
  &.collapse-exit {
    opacity: 1;
    height: ${props => props.height}px;
  }
  &.collapse-exit-active {
    opacity: 0;
    height: 0px;
  }
  &.collapse-exit-done {
    opacity: 0;
    height: 0px;
  }
`;

export const Collapse: FC<Props> = ({ children, isOpen = false }) => {
  const { ref, bounds } = useMeasure();
  const { height: elementHeight } = bounds;

  return (
    <>
      <CSSTransition appear classNames="collapse" in={isOpen} timeout={duration}>
        <CollapseWrapper height={elementHeight}>
          <div ref={ref}>{children}</div>
        </CollapseWrapper>
      </CSSTransition>
    </>
  );
};
