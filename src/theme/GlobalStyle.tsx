import { fontFace, normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

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
`
