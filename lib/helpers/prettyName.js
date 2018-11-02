'use strict';

module.exports = {
  
  // Format the plugin directory name into a title.
  getTitleCase: ( directoryName ) => {
    const title = directoryName
      .split( /-|_/ )
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join( ' ' );

    return title
  },

  // Format the plugin directory name into kebab case (if it isn't already).
  getKebabCase: ( directoryName ) => {
    const kebab = directoryName
      .split( '_' )
      .join( '-' );

    return kebab; 
  }
}