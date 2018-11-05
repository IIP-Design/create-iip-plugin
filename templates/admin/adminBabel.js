/**
 * Template for the admin babelrc file.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeBabel: ( base ) => {
    const data = `{\n` +
                 `  "presets": [\n` +
                 `    "@babel/preset-env",\n` +
                 `    "@babel/preset-react"\n` +
                 `  ]\n` +
                 `}`;

    // Write the babelrc file
    fs.writeFile(`${base}/admin/js/.babelrc`, data, (err) => {
      if (err) throw err;
    });
  }
};
