/**
 * Template for the admin index.js file (admin app entry point).
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 * @param {string} kebab The plugin name in kebab-case.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeIndex: ( base, kebab ) => {
    const data = `import React from 'react';\n` +
                 `import ReactDOM from 'react-dom';\n` +
                 `\n` +
                 `import App from './App';\n` +
                 `\n` +
                 `import './${kebab}-admin.css';\n` +
                 `\n` +
                 `ReactDOM.render(\n` +
                 `  <App />,\n` +
                 `  document.getElementById( '${kebab}-admin' )\n` +
                 `);\n` +
                 `\n` +
                 `module.hot.accept();\n`;

    // Write the entry point for the React app that forms the admin interface
    fs.writeFile(`${base}/admin/js/src/index.js`, data, (err) => {
      if (err) throw err;
    });
  }
}