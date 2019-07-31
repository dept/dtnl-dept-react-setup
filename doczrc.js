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
    return config
  },
}
