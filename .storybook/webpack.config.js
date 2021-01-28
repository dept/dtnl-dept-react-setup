const { setAliasConfig } = require('../config/alias');

module.exports = ({ config }) => {
  setAliasConfig(config);
  return config;
};
