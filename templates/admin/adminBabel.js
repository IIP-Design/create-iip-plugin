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
