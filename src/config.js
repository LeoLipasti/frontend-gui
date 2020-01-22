// @ts-check
// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = require('nconf');
// @ts-ignore
const packageJson = require('../package.json');

/**
 * Check setting existance and throw error if not provided
 * @param {Array<any>} settings Setting name to check
 */
const checkConfig = (settings) => {
  settings.forEach((setting) => {
    if (!nconf.get(setting)) {
      throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
  });
};

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'PORT',
    'PAPI_ENDPOINT',
    'API_ENDPOINT',
  ])
  // 4. Defaults
  .defaults({
    PORT: packageJson.port,
    isProduction: process.env.NODE_ENV === 'production',
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || `http://localhost:${packageJson.port}/api`,
    PAPI_ENDPOINT: process.env.REACT_APP_PAPI_ENDPOINT || `http://papi_endpoint:500`
  });

// Check required settings
checkConfig([
  'PORT',
  'PAPI_ENDPOINT',
  'API_ENDPOINT',
]);

/**
 * @typedef {Object}
 *
 * @property {Number} PORT
 * @property {String} PAPI_ENDPOINT
 * @property {String} API_ENDPOINT
 */
module.exports = nconf.get();

