const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const RemarkHTML = require('remark-html');

module.exports = {
  entry: {
    app: './src/index.jsx',
    audioSchedulerWorker: './src/workers/audioSchedulerWorker.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: false,
      stream: false,
    },
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
      patterns: [{ from: 'static' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: (data) => {
      let filename = '[name].bundle.js';

      if (data.chunk.name === 'audioSchedulerWorker') {
        filename = 'audioScheduler.worker.js';
      }

      return filename;
    },
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
};
