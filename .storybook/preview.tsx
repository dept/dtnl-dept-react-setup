import '@public/fonts/fonts.css';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../src/theme';
import { Box } from '@chakra-ui/react';

export const decorators = [
  Story => (
    <ChakraProvider theme={theme} resetCSS>
      <Box p={20}>
        <Story />
      </Box>
    </ChakraProvider>
  ),
];
