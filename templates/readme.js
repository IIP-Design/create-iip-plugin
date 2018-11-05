/**
 * Template for the plugin's readme file.
 *
 * @param {string} pluginDir The path to the plugin files on the user's machine.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

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