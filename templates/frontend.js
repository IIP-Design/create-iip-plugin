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
                 `  // INSERT YOUR FRONTEND FUNCTIONS HERE\n`+
                 '}';

    // Write to a new file named README.md
    fs.writeFile(`${base}/public/class-${kebab}-public.php`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}