import { defineConfig } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';
import { buttonRecipe } from './src/components/button/recipe';
import { cardRecipe } from './src/components/card/recipe';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  strictTokens: true,
  clean: true,

  outdir: '../../packages/styled-system',
  jsxFramework: 'react',
  presets: [pandaPreset, './src/tokens', './src/utilities', './src/preset', './src/conditions'],

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      slotRecipes: {
        card: cardRecipe,
      },
      recipes: {
        button: buttonRecipe,
      },
    },
  },
});
