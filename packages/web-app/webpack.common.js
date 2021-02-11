const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.jsx',
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'svara',
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, 'partials/body.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static' },
      ],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
};
