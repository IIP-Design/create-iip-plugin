const fs = require( 'fs' );
const git = require( 'simple-git' )();
const CLI = require( 'clui' );
const Spinner = CLI.Spinner;

const inquirer = require( './inquirer' );

module.exports = {

  createGitignore: async () => {
    const allFiles = fs.readdirSync('.');
    const fileList = allFiles.filter( function( value ) {
      if ( value !== '.git' || value !== '.gitignore' ) {
        return value;
      }
    });

    if ( filelist.length ) {
      const answers = await inquirer.askIgnoreFiles( fileList );

      if ( answers.ignore.length ) {
        fs.writeFileSync( '.gitignore', answers.ignore.join( '\n' ) );
      } else {
        touch( '.gitignore' );
      }
    } else {
      touch( '.gitignore' );
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