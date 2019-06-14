const path = require('path')
const { setAliasConfig } = require('./next.config.js/alias')

module.exports = {
  title: 'Dept Next',
  showPlaygroundEditor: false,
  typescript: true,
  port: 3001,
  menu: ['home', 'components'],

  modifyBundlerConfig: config => {
    setAliasConfig(config)
    return config
  },
}
