import { addDecorator } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../src/theme';
import { Box } from '@chakra-ui/react';

addDecorator(Story => (
  <ChakraProvider theme={theme} resetCSS>
    <Box p={20}>
      <Story />
    </Box>
  </ChakraProvider>
));
