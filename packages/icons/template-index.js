const path = require('path');

function template(filePaths) {
  return filePaths
    .map(filePath => {
      const basename = path.basename(filePath, path.extname(filePath));
      return `export { default as ${basename}Icon } from './${basename}'`;
    })
    .join('\n');
}

module.exports = template;
