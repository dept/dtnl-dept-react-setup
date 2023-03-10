import { extendTheme } from '@chakra-ui/react';

import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { components } from './components';
import { globalStyle } from './global-style';
import { radii } from './radii';
import { sizes } from './sizes';
import { space } from './space';
import { textStyles } from './textStyles';
import { fonts } from './typography';

export const theme = extendTheme({
  components,
  colors,
  fonts,
  sizes,
  space,
  breakpoints,
  textStyles,
  radii,
  styles: { global: globalStyle },
});

export type CustomTheme = typeof theme;
