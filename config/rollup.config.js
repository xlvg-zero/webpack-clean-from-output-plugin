// const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
// const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  // external: [makeExternalPredicate(externals)],
  output: [
    // {
    //   file: 'bundle.js',
    //   dir: 'dist',
    //   format: 'cjs',
    // },
    {
      name: "highest-z-index-of-document",
      file: 'libs/bundle.min.js',
      format: 'umd',
      // name: 'version',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    commonjs(),
    typescript(),
    // babel({
    //   exclude: 'node_modules/**',
    // }),
  ],
};
