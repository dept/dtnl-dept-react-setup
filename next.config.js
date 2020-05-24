require('dotenv').config()
const withPlugins = require('next-compose-plugins')

const { plugins } = require('./config/plugins')
const { exportPathMap } = require('./config/staticPages')
const { includePolyfills } = require('./config/includePolyfills')

const dev = process.env.NODE_ENV !== 'production'

module.exports = withPlugins(plugins, {
  exportPathMap,
  poweredByHeader: false,
  publicRuntimeConfig: {
    /**
     * add the environment variables you would like exposed to the client here
     * import { config } from '@/utils/config'
     * documentation: https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
     */
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  reactStrictMode: true,
  compression: true, // true to enable gzipping
  webpack(config, options) {
    if (!options.isServer) {
      const CircularDependencyPlugin = require('circular-dependency-plugin')

      config.plugins.push(
        new CircularDependencyPlugin({
          exclude: /a\.js|node_modules/,
          failOnError: true,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }),
      )
    }

    includePolyfills(config)

    return config
  },
})
