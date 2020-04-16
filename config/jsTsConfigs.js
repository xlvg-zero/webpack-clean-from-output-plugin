const babelLoaderConfig = {
  test: /(\.ts|\.js)x?$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
};

const babelTestLoaderConfig = {
  test: /(\.js|\.ts)x?/,
  loader: ['mocha-loader', 'babel-loader'],
  exclude: /(node_modules|bower_components)/,
}

module.exports = {
  babelLoaderConfig,
  babelTestLoaderConfig,
};
