/**
 * Helper function to assemble the path to a given directory.
 *
 * @param {string} pluginName The plugin name as entered by the user/base directory for the plugin.
 */

'use strict';

const path = require( 'path' );

module.exports = pluginName => {
	return path.join( process.cwd(), pluginName );
};
