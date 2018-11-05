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