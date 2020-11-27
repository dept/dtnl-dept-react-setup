import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --reach-dialog: 1; // disables warning
  }

  body {
    font-family: ${theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.8;
    min-width: 320px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
