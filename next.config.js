const withPlugins = require('next-compose-plugins')

const { plugins } = require('./config/plugins')
const { exportPathMap } = require('./config/staticPages')
const { publicRuntimeConfig, serverRuntimeConfig } = require('./config/runtimeConfig')
const { setAliasConfig } = require('./config/alias')

const dev = process.env.NODE_ENV !== 'production'

module.exports = withPlugins(plugins, {
  exportPathMap,
  publicRuntimeConfig,
  serverRuntimeConfig,
  compression: false, // true to enable gzipping
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
