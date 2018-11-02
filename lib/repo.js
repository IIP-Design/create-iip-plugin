'use strict';

const fs = require( 'fs' );
const git = require( 'simple-git' )();
const CLI = require( 'clui' );
const Spinner = CLI.Spinner;

const inquirer = require( './inquirer' );

module.exports = {

  createGitignore: async () => {
    const allFiles = fs.readdirSync('.');
    const fileList = allFiles.filter( function( value ) {
      if ( value !== '.git' && value !== '.gitignore' ) {
        return value;
      }
    });

    if ( fileList.length ) {
      const answers = await inquirer.askIgnoreFiles( fileList );
      const defaults = [ '.vscode', '.DS_Store', '.env', 'node_modules/', 'npm-debug.log*'  ];

      if ( answers.git_ignore.length ) {
        const selected = answers.git_ignore;
        const merged = [...new Set( [...defaults, ...selected] )];
        fs.writeFileSync( '.gitignore', merged.join( '\n' ) );
      } else {
        fs.writeFileSync( '.gitignore', defaults.join( '\n' ) );
      }
    } else {
      fs.writeFileSync( '.gitignore', defaults.join( '\n' ) );
    }
  },

  setUpRepo: async () => {
    const status = new Spinner( 'Initializing local repository...' )

    status.start();
    try {
      await git
        .init()
        .add( '.gitignore' )
        .add( './*' )
        .commit( 'Initial commit' )
      return true;
    } catch ( err ) {
      throw err;
    } finally {
      status.stop();
    }
  }
}