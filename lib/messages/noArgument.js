/**
 * Message printed if no command argument provided.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = () => {
	// Stop if there's no plugin name provided.
	console.log(
		'\n❌ ',
		chalk.red( ' Sorry, you need to provide a plugin name: \n' )
	);
	console.log(
		`  create-iip-plugin ${ chalk.green( '<plugin-name>' ) }`
	);
	console.log( chalk.dim( '\nFor example: \n' ) );
	console.log(
		`  ${ chalk.dim( 'create-iip-plugin' ) } ${ chalk.green( 'my-cool-plugin' ) }\n`
	);
	process.exit( 1 );
};