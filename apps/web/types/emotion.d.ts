/// <reference types="styled-jsx" />
/// <reference types="@emotion/react/types/css-prop" />

import type { CustomTheme } from '@dept/ui';

/**
 * Custom theme in global @emotion/react scope:
 * https://emotion.sh/docs/typescript#define-a-theme
 */
declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
