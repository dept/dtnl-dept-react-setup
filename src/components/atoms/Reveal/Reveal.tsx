import React from 'react';
import { useInView } from 'react-intersection-observer';

import { PseudoBox } from '../Grid';

export interface RevealProps {}

export const Reveal: React.FC<RevealProps> = ({ children }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <PseudoBox
      ref={ref}
      sx={{
        position: 'relative',
        transition: 'opacity 300ms, top 700ms',
        opacity: inView ? 1 : 0,
        top: inView ? '0px' : '15px',
      }}>
      {children}
    </PseudoBox>
  );
};
