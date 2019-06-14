import { fontFace } from 'polished'
import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
    ${styledNormalize}

    ${fontFace({
      fontFamily: 'Work Sans',
      fontFilePath: '/static/fonts/work-sans-v4-latin-regular',
      fontWeight: 'normal',
    })}

    ${fontFace({
      fontFamily: 'Work Sans',
      fontFilePath: '/static/fonts/work-sans-v4-latin-500',
      fontWeight: 'bold',
    })}

    body {
        font-family: ${theme.fonts.primary};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.8;
        min-width: 320px;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
`
