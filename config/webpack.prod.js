const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash].js',
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssPlugin({ filename: '[name].[hash].css' }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true, config: { path: './postcss.config.js' } } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});