import { recipesPreset, tokensPreset, utilitiesPreset } from '@dept/ui/index';
import pandaPreset from '@pandacss/preset-panda';

import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  strictTokens: true,
  jsxFramework: 'react',
  outdir: '../../packages/styled-system',
  presets: [pandaPreset, recipesPreset, tokensPreset, utilitiesPreset],

  // Where to look for your css declarations
  include: [
    // this is needed to make sure that the UI package is statically analyzed to generate
    // the css
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
});
