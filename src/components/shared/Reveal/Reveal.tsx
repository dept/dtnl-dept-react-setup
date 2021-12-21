import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

export interface RevealProps {
  children?: ReactNode;
}

export function Reveal({ children }: RevealProps) {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        transition: 'opacity 300ms, top 700ms',
        opacity: inView ? 1 : 0,
        top: inView ? '0px' : '15px',
      }}
    >
      {children}
    </Box>
  );
}
