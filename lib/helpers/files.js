/**
 * Helper functions to find current directory and check if a directory exists.
 *
 * @param {string} filePath Name of directory to look for.
 */

 const fs = require( 'fs' );
const path = require( 'path' );

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename( process.cwd() );
  },

  directoryExists: ( filePath ) => {
    try {
      return fs.statSync( filePath ).isDirectory();
    } catch ( err ) {
      return false;
    }
  }
};