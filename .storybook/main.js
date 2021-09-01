const path = require('path');
const fs = require('fs');

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, 'package.json'))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`,
      );
    }
    currDir = dir;
  }
}

module.exports = {
  stories: ['../src/**/*.stories.[jt]sx'],
  typescript: {
    reactDocgen: 'none', // https://github.com/storybookjs/storybook/issues/15067
  },
  babel: async options => {
    const babelConfig = require('./../babel.config.js');

    return { ...options, ...babelConfig };
  },
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource/register',
  ],
  // storybook uses emotion 10. hack to make it work with emotion 11
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': getPackageDir('@emotion/react'),
          '@emotion/styled': getPackageDir('@emotion/styled'),
          'emotion-theming': getPackageDir('@emotion/react'),
        },
      },
    };
  },
};
