/**
 * Message printed when initiating directory creation.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {string} pluginDir pluginDir The path to the plugin files on the user's machine.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( nameObj, pluginDir ) => {
  const { title } = nameObj;
  
  console.log(
    `\n Creating a WP plugin called: ${ chalk.black.bgGreen( `${ title }` ) }\n`,
		chalk.dim( `\n This plugin will be saved to the directory: ${ pluginDir }\n` )
	);
};
