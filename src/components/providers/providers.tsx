'use client';

import { theme } from '@/theme/theme';
import { isBrowser } from '@/utils/isBrowser';
import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

if (isBrowser) {
  import('@/utils/detectTouch');
  import('@/utils/detectKeyboardFocus');
}

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      {children}
    </ChakraProvider>
  );
}
