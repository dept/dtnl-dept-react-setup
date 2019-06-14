export interface Colors {
  primary: string
  secondary: string
  tertairy: string
  error: string
  black: string
  white: string
  succes: string
  warning: string
  neutral: string
  grey: GrayScaleColors
}

interface GrayScaleColors {
  dark: string
  medium: string
  light: string
  lighter: string
}

export const colors: Colors = {
  primary: '#1a18f7',
  secondary: '#E99503',
  tertairy: '#E44503',
  error: '#E00303',
  black: '#000000',
  white: '#ffffff',
  succes: '#e5fdf4',
  warning: '#fde5e5',
  neutral: '#E5F4FD',
  grey: {
    dark: '#272727',
    medium: '#7b7b7b',
    light: '#bdbdbd',
    lighter: '#f2f2f2',
  },
}
