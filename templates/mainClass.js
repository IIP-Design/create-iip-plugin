/**
 * Template for the plugin's main PHP class, which registers all hooks.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeClass: ( nameObj, pluginProps ) => {
    const { base, kebab, upperSnake } = nameObj;
    const { version, admin } = pluginProps;

    let optionalHooks;
    if ( admin ) {
      optionalHooks = `    $this->loader->add_action( 'add_meta_boxes', $plugin_admin, 'add_metabox' );\n` +
                      `    $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_${kebab}_admin' );`;
    } else {
      optionalHooks = ``;
    };

    const data = `<?php\n` +
                 `\n` +
                 `class ${upperSnake} {\n` +
                 `\n` +
                 `  /**\n` +
                 `   * The loader that's responsible for maintaining and registering all hooks that power the plugin.\n` +
                 `   *\n` +
                 `   * @since    ${version}\n` +
                 `   * @access   protected\n` +
                 `   * @var      ${upperSnake}_Loader    $loader    Maintains and registers all hooks for the plugin.\n` +
                 `   */\n` +
                 `\n` +
                 `  protected $loader;\n` +
                 `\n` +
                 `  /**\n` +
                 `   * The unique identifier and version of this plugin.\n` +
                 `   *\n` +
                 `   * @since    ${version}\n` +
                 `   * @access   protected\n` +
                 `   */\n` +
                 `\n` +
                 `  protected $plugin_name;\n` +
                 `  protected $version;\n` +
                 `\n` +
                 `  /**\n` +
                 `   * Define the core functionality of the plugin.\n` +
                 `   *\n` +
                 `   * Set the plugin name and the plugin version that can be used throughout the plugin.\n` +
                 `   * Load the dependencies and set the hooks for the admin area and\n` +
                 `   * the public-facing side of the site.\n` +
                 `   *\n` +
                 `   * @since    ${version}\n` +
                 `   */\n` +
                 `\n` +
                 `  public function __construct() {\n` +
                 `    $this->plugin_name = '${kebab}';\n` +
                 `    $this->version = '${version}';\n` +
                 `    $this->load_dependencies();\n` +
                 `    $this->define_admin_hooks();\n` +
                 `    $this->define_public_hooks();\n` +
                 `  }\n` +
                 `\n` +
                 `  /**\n` +
                 `   * Load the required dependencies for this plugin.\n` +
                 `   *\n` +
                 `   * Include the following files that make up the plugin:\n` +
                 `   *\n` +
                 `   * - ${upperSnake}\\Loader. Orchestrates the hooks of the plugin.\n` +
                 `   * - ${upperSnake}\\Admin. Defines all hooks for the admin area.\n` +
                 `   * - ${upperSnake}\\Frontend. Defines all hooks for the public side of the site.\n` +
                 `   *\n` +
                 `   * Create an instance of the loader which will be used to register the hooks with WordPress.\n` +
                 `   *\n` +
                 `   * @since    ${version}\n` +
                 `   * @access   private\n` +
                 `   */\n` +
                 `\n` +
                 `  private function load_dependencies() {\n` +
                 `    // The class responsible for orchestrating the actions and filters of the core plugin.\n` +
                 `    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-${kebab}-loader.php';\n` +
                 `\n` +
                 `    // The class responsible for defining all actions that occur in the admin area.\n` +
                 `    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-${kebab}-admin.php';\n` +
                 `\n` +
                 `    // The class responsible for defining all actions that occur in the public-facing side of the site.\n` +
                 `    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-${kebab}-public.php';\n` +
                 `    $this->loader = new ${upperSnake}\\Loader();\n` +
                 `  }\n` +
                 `\n` +
                 `  // Register all of the hooks related to the admin area functionality of the plugin.\n` +
                 `  private function define_admin_hooks() {\n` +
                 `    $plugin_admin = new ${upperSnake}\\Admin( $this->get_plugin_name(), $this->get_version() );\n` +
                 `\n` +
                 `    // Admin hooks\n` +
                 `${optionalHooks}\n` +
                 `    $this->loader->add_action( 'INSERT_WP_HOOK', $plugin_admin, 'INSERT_CALLBACK' );\n` +
                 `  }\n` +
                 `\n` +
                 `  // Register all of the hooks related to the public-facing functionality\n` +
                 `  private function define_public_hooks() {\n` +
                 `    $plugin_frontend = new ${upperSnake}\\Frontend( $this->get_plugin_name(), $this->get_version() );\n` +
                 `\n` +
                 `    // Frontend hooks\n` +
                 `    $this->loader->add_action( 'INSERT_WP_HOOK', $plugin_frontend, 'INSERT_CALLBACK' );\n` +
                 `  }\n` +
                 `\n` +
                 `  /**\n` +
                 `   * Run the loader to execute all of the hooks with WordPress.\n` +
                 `   *\n` +
                 `   * @since    ${version}\n` +
                 `   */\n` +
                 `\n` +
                 `  public function run() {\n` +
                 `    $this->loader->run();\n` +
                 `  }\n` +
                 `\n` +
                 `  /**\n` +
                 `   * The reference to the class that orchestrates the hooks with the plugin.\n` +
                 `   *\n` +
                 `   * @since     ${version}\n` +
                 `   * @return    ${upperSnake}_Loader    Orchestrates the hooks of the plugin.\n` +
                 `   */\n` +
                 `\n` +
                 `  public function get_loader() {\n` +
                 `    return $this->loader;\n` +
                 `  }\n` +
                 `\n` +
                 `  // Retrieve the name & version number of the plugin.\n` +
                 `  public function get_plugin_name() {\n` +
                 `    return $this->plugin_name;\n` +
                 `  }\n` +
                 `\n` +
                 `  public function get_version() {\n` +
                 `    return $this->version;\n` +
                 `  }\n` +
                 `}\n`;

    // Write the plugin class file where all hooks are enacted
    fs.writeFile(`${base}/includes/class-${kebab}.php`, data, (err) => {
      if (err) throw err;
    });
  }
};
