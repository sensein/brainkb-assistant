const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      preferBuiltins: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      transformMixedEsModules: true
    }),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
  external: ['react', 'react-dom'],
}; 