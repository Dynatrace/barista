const { join } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// ENTRY bundles
const entries = [
  'src/scripts/affected-args.ts',
  'src/builders/barista-build/builder.ts',
  'src/builders/barista-build/renderer.ts',
  'src/builders/typescript/index.ts',
  'src/builders/packager/index.ts',
  'src/builders/stylelint/index.ts',
  'src/index.ts',
];

module.exports = (config) => {
  // // enable dynamic chunks
  // config.output.filename = '[name].js';
  // // reset entries
  config.entry = {};

  for (const entry of entries) {
    const name = entry.replace(/\..+$/, '');
    config.entry[name] = [join(__dirname, entry)];
  }

  // // cacheUnaffected is enabled by default, but cannot be used with optimization
  // // useExports true/global.
  // config.experiments.cacheUnaffected = false;

  // // Add tree shaking with terser
  // config.optimization = {
  //   usedExports: 'global',
  //   minimizer: [new TerserPlugin()],
  // };

  return config;
};
