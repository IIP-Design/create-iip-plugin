'use strict';

const fs = require( 'fs' );

module.exports = {

  writeAdmin: ( nameObj ) => {
    const { base, title, kebab, snake, upperSnake, screamingSnake } = nameObj;

    const data = `<?php\n` +
                 `\n` +
                 `namespace ${upperSnake};\n` +
                 `\n` +
                 `class Admin {\n` +
                 `  // INSERT YOUR FRONTEND FUNCTIONS HERE\n` +
                 `  // THE BELOW INCLUDED FUNCTIONS ADD AN ADMIN METABOX AND ENQUEQUE ADMIN SCRIPTS\n` +
                 `  // FEEL FREE TO DELETE IF NOT NEEDED\n` +
                 `  public function enqueue_${snake}_admin() {\n` +
                 `\n` +
                 `    wp_enqueue_script( '${kebab}-admin-js', ${screamingSnake}_URL . 'admin/js/dist/${kebab}-admin.min.js', array(), null, true );\n` +
                 `  }\n` +
                 `\n` +
                 `  public function add_metabox() {\n` +
                 `\n` +
                 `    $post_type = array( 'post', 'page' );\n` +
                 `    add_meta_box(\n` +
                 `      '${kebab}-metabox',\n` +
                 `      __( '${title} Metabox', '${kebab}' ),\n` +
                 `      array( $this, 'render_metabox' ),\n` +
                 `      $post_type,\n` +
                 `      'normal',\n` +
                 `      'low'\n` +
                 `    );\n` +
                 `  }\n` +
                 `\n` + 
                 `  public function render_metabox() {\n` +
                 `    echo '<div id="${kebab}-admin"></div>';\n` +
                 `  }\n` +
                 `}`;

    // Write to a new file named README.md
    fs.writeFile(`${base}/admin/class-${kebab}-admin.php`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}