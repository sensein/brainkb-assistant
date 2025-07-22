const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const css = require('rollup-plugin-css-only');
const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Plugin to add 'use client' directive to output files
function addUseClientDirective() {
  return {
    name: 'add-use-client-directive',
    writeBundle(options, bundle) {
      // Add 'use client' to the main output files
      const files = ['dist/index.js', 'dist/index.esm.js', 'dist/index.umd.js'];
      
      files.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          let content = fs.readFileSync(filePath, 'utf8');
          if (!content.includes("'use client'")) {
            content = "'use client';\n" + content;
            fs.writeFileSync(filePath, content);
          }
        }
      });
    }
  };
}

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'BrainKBAssistant',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
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
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist'
    }),
    css({
      output: 'brainkb-assistant.css'
    }),
    addUseClientDirective()
  ],
  external: ['react', 'react-dom'],
  onwarn(warning, warn) {
    // Suppress warnings about missing global variable names for react/jsx-runtime
    if (warning.code === 'MISSING_GLOBAL_NAME' && warning.source === 'react/jsx-runtime') {
      return;
    }
    // Suppress warnings about module level directives
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    warn(warning);
  }
}; 