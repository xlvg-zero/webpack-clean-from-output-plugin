/* global __dirname, require, module*/

const webpack = require('webpack');
const glob = require('glob');
const { resolve } = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const extractFilename = require('./extractFilename');

const pkg = require('../package.json');

function generateTsLoaderConfig(type = "dev") {
  if (type === "production") {
    return {
      loader: "babel-loader",
      // options: {
      //   configFile: resolve(__dirname, '..', 'tsconfig.prod.json'),
      // },
    };
  } else return {
    loader: "babel-loader",
    // options: {
    //   configFile: resolve(__dirname, '..', 'tsconfig.dev.json'),
    // },
  };
};

const developmentConfig = {
  entry: resolve(__dirname, '..', 'src', 'module', 'index.tsx'),
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          generateTsLoaderConfig("dev"),
        ],
        exclude: [/\.test.ts$/]
      },
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
      { test: /\.test.ts$/, use: ["mocha-loader", generateTsLoaderConfig("dev")] },
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
  output: {
    path: resolve(__dirname, '..', 'libs'),
    filename: extractFilename(pkg.bundle),
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          generateTsLoaderConfig("production"),
        ],
      },
    ],
  },
};


const commonConfig = {
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
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
