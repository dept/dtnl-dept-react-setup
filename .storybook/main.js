module.exports = {
  stories: ['../src/**/*.stories.[jt]sx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-storysource/register',
  ],
}
