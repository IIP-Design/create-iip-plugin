/**
 * Message that printed when template files copied over.
 *
 * @param {string} upperSnake The plugin name in Upper_Snake_Case.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( upperSnake ) => {
  console.log(
    `\n Writing plugin files using the namespace: ${ chalk.green( `${ upperSnake }` ) }\n`,
	);
};
