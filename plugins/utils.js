const fs = require('fs');
const path = require('path');

module.exports.getFiles = function getFiles(dir, { extensions = [], files = [] } = {}) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, { extensions, files });
    } else if (extensions.length === 0 ||
        extensions.includes(path.extname(file))) {
      files.push(filePath);
    }
  });
  return files;
};
