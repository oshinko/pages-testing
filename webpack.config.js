const CopyPlugin = require('./plugins/CopyPlugin');
const GenerateHtmlPlugin = require('./plugins/GenerateHtmlPlugin');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const data =
  YAML.parse(fs.readFileSync(path.resolve(__dirname, 'data.yml'), 'utf8'));

module.exports = (env) => {
  let config = {
    entry: `${src}/index.js`,
    output: { filename: 'bundle.js', path: `${dist}/js` },
    plugins: [
      new CopyPlugin({ src: `${src}/static`, dist: dist }),
      new GenerateHtmlPlugin({ src: `${src}/pages`, dist, data })
    ],
    mode: env.production ? 'production' : 'development'
  };

  if (env.development) {
    config = {
      ...config,
      devServer: {
        static: { directory: dist },
        host: '0.0.0.0',
        port: 8080
      }
    };
  }

  return config;
};
