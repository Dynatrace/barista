/**
 * @license
 * Based on the build of angular/material2 by Google Inc. governed by an
 * MIT-style license that can be found in the LICENSE file at https://angular.io/license
 */

const path = require('path');
const chromeConfig = require('./chrome.conf');

process.env.CHROME_BIN = chromeConfig.binary;

const isOnCI = process.env.CI;

module.exports = (config) => {

  config.set({
    basePath: path.join(__dirname, '..'),
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-junit-reporter'),
    ],
    files: [
      {pattern: 'node_modules/core-js/client/core.js', included: true, watched: false},
      {pattern: 'node_modules/tslib/tslib.js', included: true, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/proxy.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/sync-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/jasmine-patch.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false},
      {pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false},

      // Include all Angular dependencies
      {pattern: 'node_modules/@angular/**/*', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*', included: false, watched: false},

      // Included highcharts for tests
      {pattern: 'node_modules/highcharts/highcharts.js', included: false, watched: false},

      {pattern: 'test/karma-test-shim.js', included: true, watched: false},

      // Includes all package tests and source files into karma. Those files will be watched.
      // This pattern also matches all all sourcemap files and TypeScript files for debugging.
      {pattern: 'dist/**/*', included: false, watched: true},
    ],
    preprocessors: {
      'dist/lib/**/*.js': ['sourcemap']
    },

    reporters: ['dots','junit'],
    autoWatch: false,
    singleRun: false,

    junitReporter: {
      outputDir: 'dist/testresults/',
      outputFile: 'unit-tests.xml',
      useBrowserName: false,
      suite: '',
      XMLconfigValue: true
    },

    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 240000,
    captureTimeout: 120000,
    browsers: ['CustomChromeHeadless'],

    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: chromeConfig.karmaFlags,
      }
    },

    client: {
      jasmine: {
        random: false
      }
    },

    colors: !isOnCI,
  });
};
