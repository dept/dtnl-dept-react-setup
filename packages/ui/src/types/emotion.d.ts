/// <reference types="@emotion/react/types/css-prop" />
import '@emotion/react';

import { CustomTheme } from '../theme/theme';

/**
 * Custom theme in global @emotion/react scope:
 * https://emotion.sh/docs/typescript#define-a-theme
 */
declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
