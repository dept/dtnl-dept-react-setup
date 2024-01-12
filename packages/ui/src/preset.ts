import { definePreset } from '@pandacss/dev';
import { buttonRecipe } from './components/button/recipe';
import { cardRecipe } from './components/card/recipe';
import conditions from './conditions';

export default definePreset({
  theme: {
    extend: {
      slotRecipes: { card: cardRecipe },
      recipes: { button: buttonRecipe },
    },
  },
  staticCss: {
    extend: {
      css: [
        {
          properties: {
            color: ['peach', 'white'],
          },
        },
      ],
    },
  },
  presets: [conditions],
});
