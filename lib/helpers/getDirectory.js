/**
 * Get block directory.
 *
 * @param {string} pluginName The plugin name.
 * @return {string} The plugin directory.
 */

'use strict';

const path = require( 'path' );

module.exports = pluginName => {
	return path.join( process.cwd(), pluginName );
};
