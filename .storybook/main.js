const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../{docs,src}/**/*.stories.@([jt]sx|mdx)'],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    emotionAlias: false,
  },
  /** If you want to see the @chakra-ui components in your storybook environment, simply the disable line */
  refs: {
    '@chakra-ui/react': {
      disable: true,
    },
  },
  staticDirs: ['../public'],
  addons: [
    /** SWC loader needed to prevent custom webpack configs with the swc fileloader
     * https://github.com/Karibash/storybook-addon-swc/blob/main/src/index.ts */
    'storybook-addon-swc',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
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
        path.resolve(__dirname, '../public'),
      ],
    },
  }),
};
