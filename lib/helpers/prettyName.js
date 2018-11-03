'use strict';

module.exports = {
  
  transformName: ( directoryName ) => {

    // Format the plugin directory name into a title.
    function getTitleCase( name ) {
      const title = name
        .split( /-|_/ )
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join( ' ' );

      return title
    };

    // Format the plugin directory name into kebab case (if it isn't already).
    function getKebabCase( name ) {
      const kebab = name
        .split( '_' )
        .join( '-' );

      return kebab; 
    };

    // Format the plugin directory name into snake case.
    function getSnakeCase( name ) {
      const snake = name
        .split( '-' )
        .join( '_' );

      return snake; 
    };

    // Format the plugin directory name into a title.
    function getUpperSnakeCase( name ) {
      const title = name
        .split( /-|_/ )
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join( '_' );

      return title
    };

    // Format the plugin directory name into a title.
    function getScreamingSnakeCase( name ) {
      const title = name
        .toUpperCase()
        .split( /-|_/ )
        .join( '_' );

      return title
    };

    const pluginTitleCase = getTitleCase( directoryName );
    const pluginKebabCase = getKebabCase( directoryName );
    const pluginSnakeCase = getSnakeCase( directoryName );
    const pluginUpperSnakeCase = getUpperSnakeCase( directoryName );
    const pluginScreamingSnakeCase = getScreamingSnakeCase( directoryName );

    const cases = {
      base: directoryName,
      title: pluginTitleCase,
      kebab: pluginKebabCase,
      snake: pluginSnakeCase,
      upperSnake: pluginUpperSnakeCase,
      screamingSnake: pluginScreamingSnakeCase
    }

    return cases;
  }
}