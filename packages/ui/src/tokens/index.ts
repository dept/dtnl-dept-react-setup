import { definePreset } from '@pandacss/dev';

export default definePreset({
  theme: {
    extend: {
      tokens: {
        colors: {
          white: { value: '#FFFFFF' },
          black: { value: '#000000' },
          honey: { value: '#E9C46A' },
          orange: { value: '#F4A261' },
          peach: { value: '#E76F51' },
          fog: { value: '#9A8C98' },
          lake: { value: '#778DA9' },
          darkNight: { value: '#22223B' },
        },
      },
      semanticTokens: {
        colors: {
          card: {
            color: {
              value: {
                base: '{colors.white}',
                _themeB: {
                  value: '{colors.black}',
                },
                xl: {
                  value: '{colors.black}',
                },
              },
            },
            background: {
              value: {
                base: '{colors.darkNight}',
                _themeB: {
                  value: '{colors.fog}',
                },
                xl: {
                  value: '{colors.white}',
                  _themeB: {
                    value: '{colors.white}',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
