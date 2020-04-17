/* global __dirname, require, module*/

const { resolve } = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const terserWebpackPlugin = require('terser-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const { miniCssInitialized, stylusDevModuleRule, stylusProdModuleRule } = require('./styleConfigs');
const { babelLoaderConfig, babelTestLoaderConfig } = require('./jsTsConfigs');

const developmentConfig = {
  entry: resolve(__dirname, '..', 'src', 'module', 'index.tsx'),
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      babelLoaderConfig,
      stylusDevModuleRule,
    ],
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Component Library Deving',
      template: resolve(__dirname, 'templates', 'template.html'),
    }),
  ],
};

const testConfig = {
  entry: resolve(__dirname, '..', 'src', 'test', 'main.test.ts'),
  output: {
    path: resolve(__dirname, '..', 'test'),
    filename: '[name].test.js',
  },
  module: {
    rules: [
      babelTestLoaderConfig,
      stylusDevModuleRule,
    ],
  },
  mode: 'development',
  devServer: {
    contentBase: './dist-test',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};

const productionConfig = {
  entry: resolve(__dirname, '..', 'src', 'lib', 'index.ts'),
  mode: 'production',
  optimization: {
    minimizer: [new terserWebpackPlugin(), new optimizeCssAssetsWebpackPlugin()],
  },
  output: {
    path: resolve(__dirname, '..', 'libs'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      babelLoaderConfig,
      stylusProdModuleRule,
    ],
  },
  plugins: [
    miniCssInitialized,
  ]
};


const commonConfig = {
  module: {
    rules: [
    ],
  },
  resolve: {
    // modules: [resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

let config = null;

if (env === 'production') {
  config = merge(commonConfig, productionConfig);
} else if (env === 'development') {
  config = merge(commonConfig, developmentConfig);
} else if (env === 'test') {
  config = merge(commonConfig, testConfig);
}

module.exports = config;
