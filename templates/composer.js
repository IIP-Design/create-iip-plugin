/**
 * Template for the plugin's composer file.
 *
 * @param {string} pluginDir The path to the plugin files on the user's machine.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeComposer: ( pluginDir, pluginProps ) => {
    const { author, description } = pluginProps;

    const data = `{\n` +
                 `  "name": "iip-design/${pluginDir}",\n` +
                 `  "type": "wordpress-plugin",\n` +
                 `  "description" : "${description}",\n` +
                 `  "authors": [\n` +
                 `    {\n` +
                 `      "name": "${author}"\n` +
                 `    }\n` +
                 `  ],\n` +
                 `  "minimum-stability": "stable",\n` +
                 `  "require": {\n` +
                 `    "composer/installers": "~1.0"\n` +
                 `  }\n` +
                 `}`;

    // Write the composer.json
    fs.writeFile(`${pluginDir}/composer.json`, data, (err) => {
      if (err) throw err;
    });
  }
};
