/**
 * Use commander to take in user provided argument and kick off plugin creation.
 */

'use strict';

const chalk = require( 'chalk' );
const commander = require( 'commander' );

const invalidName = require( './messages/invalidName' );
const noArgument = require( './messages/noArgument' );
const packageJson = require( '../package.json' );

module.exports = () => {
  let pluginName;

  const program = new commander.Command( packageJson.name )
    .arguments( '<plugin-name>' )
    .usage( `${ chalk.green( '<plugin-name>' ) }` )
    .action( name => {
			pluginName = name;
		} )
    .description( 'Simple CLI tool to bootstrap a WordPress plugin' )
    .on( '--help', () => {
			console.log( `\n  Run with ${ chalk.green( '<plugin-name>' ) } to start start building your plugin.\n` );
		} )
    .version( packageJson.version, '-v, --version' )
    .parse( process.argv );

  if ( typeof pluginName === 'undefined' ) {
    noArgument();
  }

  // Format the pluginName.
  const formatPluginName = pluginName
    .toLowerCase()
    .split( ' ' )
    .join( '-' );

  // Check if block name is valid.
  const pluginNameRegex = /^[a-z][a-z0-9-]/;
  if ( ! pluginNameRegex.test( formatPluginName ) ) {
    invalidName();
  }

  return formatPluginName;
};