/**
 * Template for the plugin's frontend PHP class, which registers all public hooks.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeFrontend: ( nameObj ) => {
    const { base, kebab, upperSnake } = nameObj;

    const data = `<?php\n` +
                 `\n` +
                 `namespace ${upperSnake};\n` +
                 `\n` +
                 `class Frontend {\n` +
                 `\n` +
                 `  // INSERT YOUR FRONTEND FUNCTIONS HERE\n`+
                 `\n` +
                 '}';

    // Write the frontend class file where all public hooks will be added
    fs.writeFile(`${base}/public/class-${kebab}-public.php`, data, (err) => {
      if (err) throw err;
    });
  }
};
