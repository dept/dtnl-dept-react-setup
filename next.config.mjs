/** @type {import('next').NextConfig} */

import CircularDependencyPlugin from 'circular-dependency-plugin';
import dotenv from 'dotenv';
import withPlugins from 'next-compose-plugins';

import { includePolyfills } from './config/includePolyfills.mjs';
import { plugins } from './config/plugins.mjs';

dotenv.config();

/**
 * Next config
 * documentation: https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
export default withPlugins(plugins, {
  /**
   * add the environment variables you would like exposed to the client here
   * documentation: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },

  /**
   * The experimental option allows you to enable future/experimental options
   * like React 18 concurrent features.
   */
  experimental: {
    // urlImports: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },

  /**
   * SWC minification opt-in
   * Please note that while not in experimental, the swcMinification may cause issues in your build.
   * example: https://github.com/vercel/next.js/issues/30429 (Yup email validation causes an exception)
   */
  // swcMinify: true,

  poweredByHeader: false,
  reactStrictMode: true,
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
