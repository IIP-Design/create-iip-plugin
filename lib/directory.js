/**
 * Create Plugin Directory.
 *
 * @param {string} pluginName The plugin name.
 * @param {string} pluginDir The path to the plugin directory.
 * @return {promise} promise resolved.
 */

'use strict';

const shell = require( 'shelljs' );

const invalidDir = require( './messages/invalidDir' );
const files = require( './helpers/files' );

module.exports = {

  makeDir: ( pluginName, pluginDir ) => {
    if ( files.directoryExists( pluginName ) ) {
      invalidDir( pluginDir );
    } else {
      return new Promise( async resolve => {
        shell.mkdir( '-p', pluginName );
        resolve(true);
      } );
    }
  },
  
  makeSubDirs: ( pluginName ) => {
    shell.cd( pluginName );
    shell.mkdir( '-p', [ 'admin', 'includes', 'public' ] );
    shell.cd( '../' );
  },

  makeReactDirs: ( pluginName, admin ) => {
    if ( admin ) {
      shell.cd( pluginName );
      shell.mkdir( '-p', [ 'admin/js/dist', 'admin/js/src' ] );
      shell.cd( '../' );
    }
  }
  
};
