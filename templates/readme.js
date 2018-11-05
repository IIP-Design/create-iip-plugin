'use strict';

const fs = require( 'fs' );

module.exports = {

  writeReadme: ( pluginDir, pluginProps ) => {
    const data = `# ${pluginProps.name}`;

    // Write to a new file named README.md
    fs.writeFile(`${pluginDir}/README.md`, data, (err) => {
      if (err) throw err;
    });
  }
}