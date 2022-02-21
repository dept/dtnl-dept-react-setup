const path = require('path');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
  babel: async options => {
    const babelConfig = require('./../babel.config.js');

    return { ...options, ...babelConfig };
  },
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'none',
  },
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
  ],
  // storybook uses emotion 10. hack to make it work with emotion 11
  webpackFinal: async config => {
    // Make sure storybook handles aliases like import 'components/Button'
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];

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
