import { ChakraProvider } from '@chakra-ui/react';
import { DocsContainer, DocsPage } from '@storybook/addon-docs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

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
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
