const { setAliasConfig } = require('../config/alias')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  })

  config.module.rules.push({
    test: /\.(tsx?|gql|graphql)$/,
    loader: 'eslint-loader',
    exclude: ['/node_modules/', '/.next/'],
    enforce: 'pre',
  })

  config.resolve.extensions.push('.ts', '.tsx')

  setAliasConfig(config)

  return config
}
