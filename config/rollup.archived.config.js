// const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const pkg = require('../package.json');

// console.log({ pkg });

module.exports = {
  input: 'src/lib/index.ts',
  // external: [makeExternalPredicate(externals)],
  output: [
    // {
    //   file: 'bundle.js',
    //   dir: 'dist',
    //   format: 'cjs',
    // },
    // {
    //   name: "highest-z-index-of-document",
    //   file: 'libs/bundle.min.js',
    //   format: 'umd',
    //   // name: 'version',
    //   plugins: [terser()],
    // },
    {
      file: 'libs/bundle.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'libs/bundle.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
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
    typescript({
      clean: true,
    }),
    // babel({
    //   exclude: 'node_modules/**',
    // }),
  ],
};
