module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['@typescript-eslint', 'i18next'],
  rules: {
    /** Mute unused vars by adding a _ prefix to the variable */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    /** we don't like empty functions */
    '@typescript-eslint/no-empty-function': 'error',

    'react/display-name': 'off',
    'jsx-a11y/alt-text': 'off',

    /** Turned off to not cause warnings by implementing the new next/core-web-vitals default config */
    '@next/next/no-img-element': 'off',
    '@next/next/next-script-for-ga': 'off',

    /** Get warnings when you forget to use translations */
    'i18next/no-literal-string': 1,
  },
  overrides: [
    {
      files: ['*.stories.js', '*.stories.jsx', '*.stories.ts', '*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['*.generated.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.test.tsx', '*.stories.tsx'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
