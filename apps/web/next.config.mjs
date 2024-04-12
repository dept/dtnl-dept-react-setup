import dotenv from 'dotenv';

import { headers } from './config/next-headers.mjs';
import { plugins } from './config/next-plugins.mjs';

dotenv.config();

/**
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 */
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

/**
 * Next config
 * documentation: https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
/** @type {import('next').NextConfig} */
const nextConfig = () =>
  plugins.reduce((acc, next) => next(acc), {
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
    transpilePackages: ['@dept/ui'],

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
    experimental: {
      useLightningcss: true,
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
