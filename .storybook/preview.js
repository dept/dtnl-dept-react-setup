import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from '@chakra-ui/system';

import { theme } from '../src/theme';
import { GlobalStyle } from '../src/theme/GlobalStyle';
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
