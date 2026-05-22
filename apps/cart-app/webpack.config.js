const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const mfShared = require('../../packages/mf-webpack-shared');
const mfResolve = require('../../packages/mf-webpack-resolve');
const mfTsLoader = require('../../packages/mf-ts-loader');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: mfResolve(__dirname),
  module: {
    rules: [
      mfTsLoader(__dirname),
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ORDER_API_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:4002'
      ),
    }),
    new ModuleFederationPlugin({
      name: 'cartApp',
      filename: 'remoteEntry.js',
      exposes: { './Cart': './src/Cart' },
      shared: mfShared(deps),
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
