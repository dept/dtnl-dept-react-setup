const path = require('path')

function setAliasConfig(config) {
  config.resolve.alias['@'] = path.join(process.cwd(), 'src')
  config.resolve.alias['@static'] = path.join(process.cwd(), 'public/static')
  config.resolve.alias['@server'] = path.join(process.cwd(), 'server')
}

module.exports = {
  setAliasConfig,
}
