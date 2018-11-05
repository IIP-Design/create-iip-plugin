/**
 * Template for the package.json file if admin React app selected.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 * @param {string} kebab The plugin name in kebab-case.
 * @param {string} version The user supplied plugin version.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writePackage: ( base, kebab, version ) => {
    // Build a package.json file since npm install needs it.
    const appPackage = {
      name: `${kebab}-admin`,
      version: `${version}`,
      private: true,
      scripts: {
        start: 'webpack-dev-server --config ./webpack.config.js --mode development',
        build: 'webpack --config ./webpack.config.prod.js --mode production'
      },
    };

    const data = JSON.stringify( appPackage, null, 2 ) + '\n';

    // Write the package.json file.
    fs.writeFile(`${base}/admin/js/package.json`, data, (err) => {
        if (err) throw err;
    });
  }
};
