import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/theme';
import { GlobalStyle } from '../src/theme/GlobalStyle';
import { ContextProvider } from '../src/context/ContextProvider';
import { Box } from '../src/components/atoms/Grid';

addDecorator(withKnobs);

addDecorator(story => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Box p={20}>{story()}</Box>
    </ThemeProvider>
  </>
));

addDecorator(story => <ContextProvider>{story()}</ContextProvider>);
