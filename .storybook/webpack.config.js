const { setAliasConfig } = require('../config/alias');
const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    fs: path.resolve(__dirname, 'fsMock.js'),
  };

  setAliasConfig(config);
  return config;
};
