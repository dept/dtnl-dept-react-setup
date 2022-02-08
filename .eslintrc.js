/**
 * The lint rules are extended from `dept-react-scripts`.
 * You can add or overwrite rules if you want to.
 *
 * If you wish to eject from `dept-react-script` run `npx dept-react-scripts eslint-eject`
 */

module.exports = {
  extends: [
    './node_modules/dept-react-scripts/config/eslint/react',
    'plugin:storybook/recommended',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  globals: {
    React: 'writable',
  },
};
