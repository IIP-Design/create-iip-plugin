'use strict';

const fs = require( 'fs' );

module.exports = {

  writePlugin: ( pluginDir, pluginTextDomain, pluginSnakeCase ) => {
    const data = `<?php\n` +
                 `/**\n` +
                 `* Plugin Name: <% pluginName %>\n` +
                 `* Plugin URI: <% pluginURI %>\n` +
                 `* Description: <% pluginDesc %>\n` +
                 `* Version: <% pluginVersion %>\n` +
                 `* Author: <% pluginAuthor %>\n` +
                 `* Text Domain: <% pluginTextDomain %>\n` +
                 `* License: <% pluginLicense %>\n` +
                 `* License URI: <% pluginLicenseURI %>\n` +
                 `*/\n` +
                 `\n` +
                 `// If this file is called directly, abort.\n` +
                 `if ( ! defined( 'WPINC' ) ) {\n` +
                 ` 	die;\n` +
                 `}\n` +
                 `\n` +
                 `// Define constants\n` +
                 `define( 'CHANGE_ME_DIR', plugin_dir_path( dirname( __FILE__ ) ) . '${pluginDir}/' );\n` +
                 `define( 'CHANGE_ME_URL', plugin_dir_url( dirname( __FILE__ ) ) . '${pluginDir}/' );\n` +
                 `\n` +
                 `// Imports IIP_Commons_Embed class\n` +
                 `require plugin_dir_path( __FILE__ ) . 'includes/class-${pluginTextDomain}.php';\n` +
                 `\n` +
                 `/* Begin execution of the plugin.\n` +
                 `*\n` +
                 `* Since everything within the plugin is registered via hooks,\n` +
                 `* then kicking off the plugin from this point in the file does\n` +
                 `* not affect the page life cycle.\n` +
                 `*\n` +
                 `*/\n` +
                 `function run_${pluginSnakeCase}() {\n` +
                 `  $plugin = new CHANGE_ME();\n` +
                 `  $plugin->run();\n` +
                 `}\n` +
                 `run_${pluginSnakeCase}();`;

    // write to a new file named README.md
    fs.writeFile(`${pluginDir}/${pluginTextDomain}.php`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}