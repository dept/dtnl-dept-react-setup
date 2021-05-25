require('dotenv').config();
const withPlugins = require('next-compose-plugins');

const { includePolyfills } = require('./config/includePolyfills');
const { plugins } = require('./config/plugins');

/**
 * Next config
 * documentation: https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
module.exports = withPlugins(plugins, {
  /**
   * add the environment variables you would like exposed to the client here
   * documentation: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },
  poweredByHeader: false,
  // reactStrictMode: true,
  compress: true,
  /**
   * https://nextjs.org/docs/basic-features/image-optimization
   * Settings are the defaults
   */
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: [],
    path: '/_next/image',
    loader: 'default',
  },
  /**
   * https://nextjs.org/docs/advanced-features/i18n-routing
   */
  // i18n: {
  //   locales: ['en', 'nl'],
  //   defaultLocale: 'en',
  // },
  webpack(config, options) {
    if (!options.isServer) {
      const CircularDependencyPlugin = require('circular-dependency-plugin');

      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          failOnError: true,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }),
      );
    }

    includePolyfills(config);

    return config;
  },
});
