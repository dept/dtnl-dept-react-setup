require('dotenv').config()
const withPlugins = require('next-compose-plugins')

const { plugins } = require('./config/plugins')
const { exportPathMap } = require('./config/staticPages')
const { setAliasConfig } = require('./config/alias')

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

    const originalEntry = config.entry

    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js'] && !entries['main.js'].includes('./src/polyfills.ts')) {
        entries['main.js'].unshift('./src/polyfills.ts')
      }

      return entries
    }

    setAliasConfig(config)

    return config
  },
})
