const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
  },
  devServer: {
    port: 1302,
    clientLogLevel: 'silent',
    compress: true,
    overlay: true,
    hot: true,
    watchContentBase: true,
    contentBase: './src/index.html',
    historyApiFallback: true,
    noInfo: true,
    open: true,
  },
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true, config: { path: './postcss.config.js' } } },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new CleanWebpackPlugin()],
});
