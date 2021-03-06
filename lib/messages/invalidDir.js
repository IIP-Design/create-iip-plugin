/**
 * Message printed if requested directory already exists.
 *
 * @param  {string} pluginDir The path to the plugin files on the user's machine.
 */

'use strict';

const chalk = require( 'chalk' );

module.exports = ( pluginDir ) => {
  console.log(
    '\n❌ ',
    chalk.red( ` A directory already exists at: ${pluginDir} \n` )
  );

  console.log(
    `${ chalk.dim( ' Please move or delete it and run this command again.' ) }\n`,
    `${ chalk.dim( 'Alternately, provide a different name for your plugin.' ) }`
  );

  console.log( `${ chalk.dim( '\nFor example: \n' ) }` );
  console.log( `  ${ chalk.dim( 'create-iip-plugin' ) } ${ chalk.green( 'new-plugin-name' ) }\n` );
  process.exit( 1 );
};