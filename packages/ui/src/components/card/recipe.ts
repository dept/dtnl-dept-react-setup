import { defineSlotRecipe } from '@pandacss/dev';

export const cardRecipe = defineSlotRecipe({
  className: 'card',
  slots: ['root', 'title', 'body'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      padding: 4,
      width: '262px',
      bg: 'card.background',
      color: 'card.color',
      border: 'solid 1px black',
      borderRadius: 'md',
    },
    title: {
      fontSize: '48px',
      lineHeight: 1,
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
    body: {},
  },
});
