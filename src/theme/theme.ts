import { darken, rgba } from 'polished';
import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import { grid } from './grid';
import { typography } from './typography';

const space = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
};

const breakpoints: any = ['40em', '52em', '64em', '80em'];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export const buttons = {
  primary: {
    border: '1px solid',
    borderColor: 'transparant',
    bg: 'primary',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      bg: darken(0.2, colors.primary),
    },
    '&:disabled': {
      bg: 'gray.300',
      color: 'gray.800',
    },
  },
  secondary: {
    border: '1px solid',
    borderColor: 'currentColor',
    bg: 'white',
    borderRadius: 5,
    color: 'primary',
    fontWeight: 'bold',
    '&:hover': {
      bg: rgba(colors.primary, 0.05),
    },
    '&:disabled': {
      color: 'gray.300',
    },
  },
  clear: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    border: 'none',
  },
};

// buttonSizes based on sizes in spaces
export const buttonSizes = {
  small: {
    py: 1,
    px: 3,
  },
  medium: {
    py: 2,
    px: 4,
  },
  large: {
    py: 3,
    px: 6,
  },
};

const shadows = {
  small: '0 0 4px rgba(0, 0, 0, .125)',
  large: '0 0 24px rgba(0, 0, 0, .125)',
  outline: '0px 0px 0px 4px rgba(0, 0, 0, 0.1);',
};

const input = {
  borderColor: '#bdbdbd',
  height: '50px',
  hover: {
    borderColor: '#7b7b7b',
  },
};

export const textVariants = {
  heading1: {
    fontSize: ['2rem', '3rem', '4rem'],
    color: 'black',
  },
};

export type ButtonOption = keyof typeof buttons;

export interface ThemeGridContainer {
  maxWidth: number;
  padding: number | any[];
}

export interface ThemeGrid {
  gutter: number | any[];
  container: ThemeGridContainer;
}

export interface CustomTheme {
  breakpoints: typeof breakpoints;
  letterSpacings: typeof typography['letterSpacings'];
  lineHeights: typeof typography['lineHeights'];
  fontWeights: typeof typography['fontWeights'];
  fonts: typeof typography['fonts'];
  fontSizes: typeof typography['fontSizes'];
  colors: typeof colors;
  space: typeof space;
  shadows: typeof shadows;
  buttons: typeof buttons;
  buttonSizes: typeof buttonSizes;
  textVariants: typeof textVariants;
  outline?: string;
  grid: ThemeGrid;
  input: typeof input;
}

export const theme: DefaultTheme = {
  ...typography,
  breakpoints,
  space,
  shadows,
  outline: `5px auto ${colors.gray[300]}`,
  colors,
  buttons,
  buttonSizes,
  grid,
  input,
  textVariants,
};
