import { definePreset } from '@pandacss/dev';

export default definePreset({
  conditions: {
    extend: {
      themeA: '[data-theme=themeA] &, &[data-theme=themeA]',
      themeB: '[data-theme=themeB] &, &[data-theme=themeB]',
    },
  },
});
