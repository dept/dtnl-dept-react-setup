// @ts-check
/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';

import path from 'path';
import { headers } from './config/next-headers.mjs';
import { plugins } from './config/next-plugins.mjs';

dotenv.config();

/**
 * Next config
 * documentation: https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig = () =>
  plugins.reduce((acc, next) => next(acc), {
    cacheHandler: path.resolve('../../packages/cache/next/cache-handler.mjs'),
    cacheMaxMemorySize: 0,
    /**
     * add the environment variables you would like exposed to the client here
     * documentation: https://nextjs.org/docs/api-reference/next.config.js/environment-variables
     */
    env: {
      ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },

    /**
     * Built-in transpiler, simply add more packages here if you want to transpile them on the fly
     * documentation: https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable
     */
    transpilePackages: ['@dept/ui', '@dept/icons'],

    /**
     * Enable emotion through the swc compiler
     */
    compiler: {
      emotion: true,
    },

    poweredByHeader: false,
    reactStrictMode: true,
    compress: true,

    /**
     * add the headers you would like your next server to use
     * documentation: https://nextjs.org/docs/api-reference/next.config.js/headers
     *                https://nextjs.org/docs/advanced-features/security-headers
     */
    headers,

    /**
     * https://nextjs.org/docs/basic-features/image-optimization
     * Settings are the defaults
     */
    images: {
      deviceSizes: [320, 420, 768, 1024, 1200],
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
        import('circular-dependency-plugin').then(({ default: CircularDependencyPlugin }) => {
          config.plugins.push(
            new CircularDependencyPlugin({
              exclude: /a\.js|node_modules/,
              failOnError: true,
              allowAsyncCycles: false,
              cwd: process.cwd(),
            }),
          );
        });
      }

      return config;
    },
  });

export default nextConfig;
