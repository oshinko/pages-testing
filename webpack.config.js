const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/assets/js'),
    publicPath: '',
  },
  performance: {
    hints: false,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, './'), 'node_modules'],
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  mode: 'production',
  devtool: false
}
