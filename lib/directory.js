/**
 * Create the plugin directory and it's sub-directories.
 *
 * @param {string} pluginName The plugin name as entered by the user/base directory for the plugin.
 * @param {string} pluginDir he path to the plugin files on the user's machine.
 * @param {boolean} admin If true build React admin section; if false do not
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
