/**
 * Helper function to assemble the path to a given directory.
 *
 * @param {string} pluginDir The path to the plugin files on the user's machine.
 * @param {string} uri The path to the plugin's git repository. 
 * @param {string} kebab The plugin name in kebab-case.
 */

'use strict';

const clui = require( 'clui' );
const Spinner = clui.Spinner;
const fs = require( 'fs' );
const git = require( 'simple-git' );

module.exports = {

  createGitignore: async ( kebab ) => {
    const defaults = [ '# Editor', '.vscode', '.DS_Store', `\n# Environment`, '.env', `\n# Dependencies`, 'node_modules/', 'npm-debug.log*', `\n#Development Build`, `dist/${kebab}-admin.js` ];

    fs.writeFileSync( '.gitignore', defaults.join( '\n' ) );
  },

  setUpRepo: async ( pluginDir, uri ) => {
    const status = new Spinner( 'Initializing local repository...' )
    
    status.start();
    try {
      git( pluginDir )
        .init()
        .add( './*' )
        .commit( 'Initial commit - bootstrapped with Create IIP Plugin' )
        .addRemote('origin', uri)
      return true;
    } catch ( err ) {
      throw err;
    } finally {
      status.stop();
    }
  }
};
