const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const { getFiles } = require('./utils');

// function getFiles(dir, { extensions = [], files = [] } = {}) {
//   fs.readdirSync(dir).forEach(file => {
//     const filePath = path.join(dir, file);
//     if (fs.statSync(filePath).isDirectory()) {
//       getFiles(filePath, { extensions, files });
//     } else if (extensions.includes(path.extname(file))) {
//       files.push(filePath);
//     }
//   });
//   return files;
// }

class GenerateHtmlPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyHtmlPlugin', (compilation, callback) => {
      const src = this.options.src;
      const dist = this.options.dist;

      getFiles(src, { extensions: ['.html', '.njk'] }).forEach(file => {
        const relativePath = path.relative(src, file);
        const outputRelativePath = path.format({
          ...path.parse(relativePath),
          base: undefined,
          ext: '.html'
        });
        const outputPath = path.join(dist, outputRelativePath);
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const content = nunjucks.render(file, this.options.data ?? {});
        fs.writeFileSync(outputPath, content);
        console.log(`Rendered and copied: ${file} -> ${outputPath}`);
      });

      callback();
    });
  }
}

module.exports = GenerateHtmlPlugin;
