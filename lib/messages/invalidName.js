/**
 * Message printed if invalid name provided as a command argument.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = () => {
	// Stop if given plugin name is not valid.
	console.log(
		'\n❌ ',
		chalk.red( ' Please provide a valid plugin name: \n' )
	);

  console.log( '  ⚠️  A plugin name can only contain lowercase alphanumeric characters and dashes.' );
	console.log( '  ⚠️  It must also must begin with a letter. \n' );

	process.exit( 1 );
};