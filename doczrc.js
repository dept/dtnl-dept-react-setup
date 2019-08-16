const path = require('path')
const { setAliasConfig } = require('./config/alias')

module.exports = {
  title: 'Dept Next',
  showPlaygroundEditor: false,
  typescript: true,
  port: 3001,
  // menu: ['home', 'components'],
  wrapper: 'docz/wrapper.jsx',
  modifyBundlerConfig: config => {
    setAliasConfig(config)

    const index = config.module.rules.findIndex(
      rule => rule.test.toString() === '/\\.(svg)(\\?.*)?$/',
    )

    config.module.rules.splice(index, 1)

    config.module.rules.push({
      test: /\\.(svg)(\\?.*)?$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [{ removeTitle: false }],
              floatPrecision: 2,
            },
          },
        },
      ],
    })

    return config
  },
}
