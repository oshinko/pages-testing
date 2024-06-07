const fs = require('fs');
const path = require('path');
const { getFiles } = require('./utils');

class CopyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyHtmlPlugin', (compilation, callback) => {
      const src = this.options.src;
      const dist = this.options.dist;

      getFiles(src).forEach(file => {
        const relativePath = path.relative(src, file);
        const outputPath = path.join(dist, relativePath);
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const content = fs.readFileSync(file);
        fs.writeFileSync(outputPath, content);
        console.log(`Copied: ${file} -> ${outputPath}`);
      });

      callback();
    });
  }
}

module.exports = CopyPlugin;
