'use strict';

const fs = require( 'fs' );

module.exports = {

  writeAdmin: ( nameObj ) => {
    const { base, kebab, upperSnake } = nameObj;

    const data = `<?php\n` +
                 `\n` +
                 `namespace ${upperSnake};\n` +
                 `\n` +
                 `class Admin {\n` +
                 `\n` +
                 `  // INSERT YOUR FRONTEND FUNCTIONS HERE\n` +
                 `\n` +
                 `}`;

    // Write the admin class file where all admin hooks will be added
    fs.writeFile(`${base}/admin/class-${kebab}-admin.php`, data, (err) => {
      if (err) throw err;
    });
  }
}