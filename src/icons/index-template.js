const path = require('path');

const indexTemplate = filePaths =>
  filePaths
    .map(filePath => {
      const basename = path.basename(filePath, path.extname(filePath));
      return `export { default as ${basename}Icon } from './${basename}'`;
    })
    .join('\n');

module.exports = indexTemplate;
