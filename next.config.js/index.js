const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const withPlugins = require('next-compose-plugins')

const { plugins } = require('./plugins')
const { exportPathMap } = require('./staticPages')
const { publicRuntimeConfig, serverRuntimeConfig } = require('./runtimeConfig')
const { setAliasConfig } = require('./alias')

const dev = process.env.NODE_ENV !== 'production'

module.exports = withPlugins(plugins, {
  exportPathMap,
  publicRuntimeConfig,
  serverRuntimeConfig,
  webpack(config, options) {
    if (options.isServer) {
      config.module.rules.push({
        test: /\.(tsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/'],
        enforce: 'pre',
      })
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

    // Overcome webpack referencing `window` in chunks
    // config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`

    return config
  },
})
