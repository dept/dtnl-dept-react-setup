import '@public/fonts/fonts.css';

import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../src/theme';
import { Box } from '@chakra-ui/react';

addDecorator(withKnobs);

addDecorator(story => (
  <>
    <ChakraProvider theme={theme} resetCSS>
      <Box p={20}>{story()}</Box>
    </ChakraProvider>
  </>
));
