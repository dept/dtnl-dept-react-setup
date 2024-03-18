import { ChakraProvider } from '@chakra-ui/react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import React from 'react';
import { theme } from '../src/theme';

export const decorators = [
  Story => (
    <ChakraProvider theme={theme} resetCSS>
      <Story />
    </ChakraProvider>
  ),
];

export const parameters = {
  options: {
    storySort: {
      order: ['Docs', 'Atoms', 'Molecules', 'Organisms', '*'],
    },
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
