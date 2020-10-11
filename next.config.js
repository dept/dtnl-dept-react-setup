require('dotenv').config();
const withPlugins = require('next-compose-plugins');

const { plugins } = require('./config/plugins');
const { includePolyfills } = require('./config/includePolyfills');

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
    IE_SUPPORT: process.env.IE_SUPPORT,
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
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
