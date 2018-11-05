/**
 * Template for the admin App.jsx file.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeApp: ( base ) => {
    const data = `import React from 'react';\n` +
                 `\n` +
                 `const App = () => {\n` +
                 `  <div className="App">\n` +
                 `    <p>\n` +
                 `      You can now start building your backend at <code>${base}/admin/js/src/App.jsx</code>.\n` +
                 `    </p>\n` +
                 `  </div>\n` +
                 `}\n` +
                 `\n` +
                 `export default App;`

    // Write the base file for the admin React app
    fs.writeFile(`${base}/admin/js/src/App.jsx`, data, (err) => {
      if (err) throw err;
    });
  }
};