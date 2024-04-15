import { dirname, join } from 'path';
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.@(stories.@(ts|tsx))'],

  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: { builder: { useSWC: true } },
  },

  typescript: {
    reactDocgen: 'none',
  },

  features: {
    emotionAlias: false,
  },

  docs: {
    autodocs: true,
  },

  /** If you want to see the @chakra-ui components in your storybook environment, simply the disable line */
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },

  staticDirs: [path.resolve(__dirname, '../../../apps/web/public')],

  addons: [
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('@storybook/addon-viewport'),
  ],

  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [
        /** Make sure storybook handles aliases like import 'components/Button */
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        }),
      ],
      roots: [
        /** Server .../public as a root to serve static files loaded through css */
        path.resolve(__dirname, '../../../apps/web/public'),
      ],
    },
  }),
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
