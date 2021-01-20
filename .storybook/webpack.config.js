const { setAliasConfig } = require('../config/alias');

module.exports = ({ config }) => {
  console.dir(config.module.rules, { depth: null });

  setAliasConfig(config);
  return config;
};
