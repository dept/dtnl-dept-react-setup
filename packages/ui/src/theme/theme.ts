import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import * as components from './components';
import { globalStyle } from './global-style';
import { sizes, space } from './sizes';
import { fonts } from './typography';

export const theme = extendTheme({
  components,
  colors,
  fonts,
  sizes,
  space,
  styles: { global: globalStyle },
});

export type CustomTheme = typeof theme;
