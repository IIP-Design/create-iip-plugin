/**
 * Template for the admin CSS file.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 * @param {string} kebab The plugin name in kebab-case.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeCss: ( base, kebab ) => {
    const data = `/* INSERT ADMIN STYLES HERE */`

    // Write the admin CSS file
    fs.writeFile(`${base}/admin/js/src/${kebab}-admin.css`, data, (err) => {
      if (err) throw err;
    });
  }
};
