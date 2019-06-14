import { DefaultTheme } from 'styled-components'

import { colors } from './colors'

export const theme: DefaultTheme = {
  breakpoints: ['40em', '52em', '64em', '80em'],
  fontSizes: {
    xxxs: 12,
    xxs: 16,
    xs: 20,
    s: 30,
    m: 40,
    l: 60,
    xl: 80,
    xxl: 100,
  },
  space: {
    xxxs: 8,
    xxs: 10,
    xs: 20,
    s: 40,
    m: 60,
    l: 80,
    xl: 100,
    xxl: 120,
  },
  fonts: {
    primary: 'Work Sans, sans-serif',
    secondary: 'Helvetica',
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)',
  },
  outline: `5px auto #5E9ED6`,
  colors,
}
