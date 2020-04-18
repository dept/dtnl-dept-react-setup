import { darken } from 'polished'
import { DefaultTheme } from 'styled-components'

import * as iconComponents from '../../public/icons/components'
import { colors } from './colors'
import { grid } from './grid'
import { typography } from './typography'

const space = {
  xxxs: 8,
  xxs: 10,
  xs: 20,
  s: 40,
  m: 60,
  l: 80,
  xl: 100,
  xxl: 120,
}

const breakpoints: any = ['40em', '52em', '64em', '80em']

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const buttonBase = {
  fontWeight: 'bold',
  border: '1px solid',
  borderColor: 'primary',
  padding: '0 20px',
  height: 50,
  borderRadius: 50,
}

export const buttons = {
  primary: {
    ...buttonBase,
    bg: 'primary',
    color: 'white',
    ['&:hover, &:focus']: {
      backgroundColor: darken(0.2, colors.primary),
    },
  },
  secondary: {
    ...buttonBase,
    color: 'black',
  },
  clear: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    height: 'auto',
  },
}

const shadows = {
  small: '0 0 4px rgba(0, 0, 0, .125)',
  large: '0 0 24px rgba(0, 0, 0, .125)',
  outline: '0px 0px 0px 4px rgba(0, 0, 0, 0.1);',
}

const input = {
  borderColor: '#bdbdbd',
  height: '50px',
  hover: {
    borderColor: '#7b7b7b',
  },
}

export const icons = iconComponents

export type IconOption = keyof typeof icons

export interface ThemeGridContainer {
  maxWidth: number
  padding: number | any[]
}

export interface ThemeGrid {
  gutter: number | any[]
  container: ThemeGridContainer
}

export interface CustomTheme {
  breakpoints: typeof breakpoints
  letterSpacings: typeof typography['letterSpacings']
  lineHeights: typeof typography['lineHeights']
  fontWeights: typeof typography['fontWeights']
  fonts: typeof typography['fonts']
  fontSizes: typeof typography['fontSizes']
  colors: typeof colors
  space: typeof space
  shadows: typeof shadows
  buttons: typeof buttons
  outline?: string
  grid: ThemeGrid
  input: typeof input
}

export const theme: DefaultTheme = {
  ...typography,
  breakpoints,
  space,
  shadows,
  outline: `5px auto ${colors.gray[300]}`,
  colors,
  buttons,
  grid,
  input,
}
