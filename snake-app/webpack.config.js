const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    target: 'electron-renderer',
    mode: 'development',
    entry: './app/src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // other plugins
  ],
};