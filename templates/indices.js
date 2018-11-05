'use strict';

const fs = require( 'fs' );

module.exports = {

  writeIndices: ( base ) => {
    const data = `<?php\n` +
                 `// Silence is golden\n` +
                 `?>`;

    // Write empty index.php file into each subdirectory
    fs.writeFile(`${base}/admin/index.php`, data, (err) => {
      if (err) throw err;
    });

    fs.writeFile(`${base}/includes/index.php`, data, (err) => {
      if (err) throw err;
    });

    fs.writeFile(`${base}/public/index.php`, data, (err) => {
      if (err) throw err;
    });
  }
}