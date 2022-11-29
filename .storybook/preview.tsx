import { ChakraProvider } from '@chakra-ui/react';
import '@public/fonts/fonts.css';

import { Box } from '@chakra-ui/react';
import { theme } from '../src/theme';

export const decorators = [
  Story => (
    <ChakraProvider theme={theme} resetCSS>
      <Box p={20}>
        <Story />
      </Box>
    </ChakraProvider>
  ),
];
