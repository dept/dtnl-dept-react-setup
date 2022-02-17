import '@public/fonts/fonts.css';

import { addDecorator } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../src/theme';
import { Box } from '@chakra-ui/react';

addDecorator(story => (
  <ChakraProvider theme={theme} resetCSS>
    <Box p={20}>{story()}</Box>
  </ChakraProvider>
));
