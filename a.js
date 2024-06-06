const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

function getHtmlFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, files);
    } else if (path.extname(file) === '.html') {
      files.push(filePath);
    }
  });
  return files;
}

const pageDir = path.join(srcDir, 'pages');

for (const file of getHtmlFiles(pageDir)) {
  const content = nunjucks.render(file, { title: 'My Website', foo: 'bar', items: ['a', 'b', 'c', 'd'] });
  const relPath = path.relative(pageDir, file);
  fs.writeFileSync(path.join(distDir, relPath), content, 'utf8');
}
