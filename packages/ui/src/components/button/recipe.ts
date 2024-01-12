import { defineRecipe, defineSlotRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
  className: 'button',
  description: 'The styles for the Button component',
  base: {
    display: 'flex',
  },
  variants: {
    visual: {
      funky: { bg: 'orange', color: 'black' },
    },
    size: {
      sm: { padding: '4', fontSize: '16px' },
      lg: { padding: '8', fontSize: '40px' },
    },
    shape: {
      square: { borderRadius: 'md' },
      circle: { borderRadius: '[12px]' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
  },
  defaultVariants: {
    visual: 'funky',
    size: 'sm',
    shape: 'square',
    fullWidth: false,
  },
});
