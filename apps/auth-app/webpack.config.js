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
    port: 3001,
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
      'process.env.NEXT_PUBLIC_AUTH_API_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:4001'
      ),
    }),
    new ModuleFederationPlugin({
      name: 'authApp',
      filename: 'remoteEntry.js',
      exposes: { './Login': './src/Login' },
      shared: mfShared(deps),
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
