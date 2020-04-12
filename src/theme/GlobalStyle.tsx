import { normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

const systemUiFonts =
  '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  body {
    font-family: ${systemUiFonts || theme.fonts.primary};
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
