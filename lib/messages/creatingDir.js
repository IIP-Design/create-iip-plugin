/**
 * Print anything in the start.
 *
 * @param {string} pluginName The plugin name.
 * @param  {string} pluginDir The plugin directory.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( nameObj, pluginDir ) => {
  const { title } = nameObj;
  
  console.log(
    `\n Creating a WP plugin called: ${ chalk.black.bgGreen( `${ title }` ) }\n`,
		chalk.dim( `\n This plugin will be saved to the directory: ${ pluginDir }\n` ),
		chalk.dim( 'This might take a few minutes.\n' )
	);
};
