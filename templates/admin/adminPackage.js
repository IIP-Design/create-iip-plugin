'use strict';

const fs = require( 'fs' );

module.exports = {

  writePackage: ( base, kebab, version ) => {
    const data = `{\n` +
                 `"name": "${kebab}-admin",\n` +
                 `  "version": "${version}",\n` +
                 `  "private": true,\n` +
                 `  "scripts": {\n` +
                 `    "start": "webpack-dev-server --config ./webpack.config.js --mode development",\n` +
                 `    "build": "webpack --config ./webpack.config.prod.js --mode production"\n` +
                 `  }\n` +
                 `}`;

    // Write the package.json for the admin app
    fs.writeFile(`${base}/admin/js/package.json`, data, (err) => {
      if (err) throw err;
    });
  }
}