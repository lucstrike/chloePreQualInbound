const path = require('path');

module.exports = {
  entry: {
  sendMessage: path.resolve(__dirname, './src/functions-lambda/sendMessage.js'),
  updatePrompt: path.resolve(__dirname, './src/functions-lambda/updatePrompt.js'),
},
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',       // Gera sendMessage.js e updatePrompt.js
    libraryTarget: 'commonjs2',  // Para Node.js
  },
  externals: [], // deixe axios, openai, etc., se precisar bundlear
  resolve: {
    extensions: ['.js', '.json'], // permite importar sem escrever extensão
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // se quiser transpilar ES6
      },
    ],
  },
};
