/**
 * Print anything in the start.
 *
 * @param {string} pluginName The plugin name.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( upperSnake ) => {
  console.log(
    `\n Writing plugin files using the namespace: ${ chalk.green( `${ upperSnake }` ) }\n`,
	);
};
