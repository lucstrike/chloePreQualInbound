const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  externals: [nodeExternals()],
};
