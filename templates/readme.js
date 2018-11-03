'use strict';

const fs = require( 'fs' );

module.exports = {

  writeReadme: ( pluginDir, pluginProps ) => {
    const data = `# ${pluginProps.name}`;

    // write to a new file named README.md
    fs.writeFile(`${pluginDir}/README.md`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}