// import original module declarations
import 'styled-components'

import { Colors } from '@/theme/colors'

interface SizeLadder {
  xxxs: number
  xxs: number
  xs: number
  s: number
  m: number
  l: number
  xl: number
  xxl: number
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: string[]
    fontSizes: SizeLadder
    colors: Colors
    space: SizeLadder
    fonts: {
      primary: string
      secondary: string
    }
    outline?: string
    shadows: {
      small: string
      large: string
    }
    grid: any
  }
}
