import { definePreset, Preset } from '@pandacss/dev';

export default definePreset({
  utilities: {
    extend: {
      flexCenter: {
        className: 'flexCenter',
        values: { type: 'boolean' },
        transform(value) {
          if (!value) return {};
          return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          };
        },
      },
    },
  },
});
