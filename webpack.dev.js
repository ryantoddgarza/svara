const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /worker\.js$/,
        use: [
          'worker-loader',
          'babel-loader',
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
	      sourceMap: true,
              plugins: () => [
                autoprefixer({})
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});

