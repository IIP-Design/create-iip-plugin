/**
 * Template for the plugin's prinicple PHP file - the entry point for WordPress.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writePlugin: ( nameObj, pluginProps ) => {
    const { base, kebab, snake, upperSnake, screamingSnake } = nameObj
    const { name, uri, description, version, author, domain, license, licenseUri } = pluginProps;

    const data = `<?php\n` +
                 `\n` +
                 `/**\n` +
                 `* Plugin Name: ${name}\n` +
                 `* Plugin URI: ${uri}\n` +
                 `* Description: ${description}\n` +
                 `* Version: ${version}\n` +
                 `* Author: ${author}\n` +
                 `* Text Domain: ${domain}\n` +
                 `* License: ${license}\n` +
                 `* License URI: ${licenseUri}\n` +
                 `*/\n` +
                 `\n` +
                 `// If this file is called directly, abort.\n` +
                 `if ( ! defined( 'WPINC' ) ) {\n` +
                 ` 	die;\n` +
                 `}\n` +
                 `\n` +
                 `// Define constants\n` +
                 `define( '${screamingSnake}_DIR', plugin_dir_path( dirname( __FILE__ ) ) . '${base}/' );\n` +
                 `define( '${screamingSnake}_URL', plugin_dir_url( dirname( __FILE__ ) ) . '${base}/' );\n` +
                 `\n` +
                 `// Imports ${upperSnake} class\n` +
                 `require plugin_dir_path( __FILE__ ) . 'includes/class-${kebab}.php';\n` +
                 `\n` +
                 `/* Begin execution of the plugin.\n` +
                 `*\n` +
                 `* Since everything within the plugin is registered via hooks,\n` +
                 `* then kicking off the plugin from this point in the file does\n` +
                 `* not affect the page life cycle.\n` +
                 `*\n` +
                 `*/\n` +
                 `\n` +
                 `function run_${snake}() {\n` +
                 `  $plugin = new ${upperSnake}();\n` +
                 `  $plugin->run();\n` +
                 `}\n` +
                 `run_${snake}();`;

    // Write the plugin PHP file, which registers the plugin
    fs.writeFile(`${base}/${kebab}.php`, data, (err) => {
      if (err) throw err;
    });
  }
};
