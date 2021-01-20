module.exports = {
  stories: ['../src/**/*.stories.[jt]sx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource/register',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          additionalData: `
            @import 'src/sass/00_settings/all';
            @import 'src/sass/01_tools/all';
            `,
        },
      },
    },
  ],
};
