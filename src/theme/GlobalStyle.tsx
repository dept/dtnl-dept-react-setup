import { css, Global } from '@emotion/react';
import { normalize } from 'polished';
import React from 'react';

import { theme } from './theme';

export const GlobalStyle = () => (
  <Global
    styles={css`
      ${normalize()}

      * {
        box-sizing: border-box;
      }

      :root {
        --reach-dialog: 1;
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
    `}
  />
);
