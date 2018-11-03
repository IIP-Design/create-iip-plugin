/**
 * Print anything in the start.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {string} pluginDir The path to the plugin files on the user's machine
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( nameObj, pluginDir ) => {
  const { title } = nameObj;
  
  console.log(
    `\n`,
    `${ chalk.green( 'All done!' ) } We've successfully bootstrapped the ${title} plugin. 🎉\n`,
    `Find out more about the templates structure and content in the README.md found here:\n`,
    `\n`,
    `   ${pluginDir}\n`,
    `\n`,
    `Thanks for using Create IIP Plugin!\n`
	);
};
