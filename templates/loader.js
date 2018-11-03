'use strict';

const fs = require( 'fs' );

module.exports = {

  writeLoader: ( nameObj, pluginProps ) => {
    const { base, kebab, upperSnake } = nameObj
    const { version, author } = pluginProps;

    const data = `<?php\n` +
                 `namespace ${upperSnake};\n` +
                 `/**\n` +
                 ` * Register all actions and filters for the plugin.\n` +
                 ` *\n` +
                 ` * Maintain a list of all hooks that are registered throughout\n` +
                 ` * the plugin, and register them with the WordPress API. Call the\n` +
                 ` * run function to execute the list of actions and filters.\n` +
                 ` *\n` +
                 ` * @package    ${upperSnake}\n` +
                 ` * @subpackage ${upperSnake}/includes\n` +
                 ` * @author     ${author}\n` +
                 ` */\n` +
                 `class Loader {\n` +
                 `	/**\n` +
                 `	 * The array of actions registered with WordPress.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 * @access   protected\n` +
                 `	 * @var      array    $actions    The actions registered with WordPress to fire when the plugin loads.\n` +
                 `	 */\n` +
                 `	protected $actions;\n` +
                 `	/**\n` +
                 `	 * The array of filters registered with WordPress.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 * @access   protected\n` +
                 `	 * @var      array    $filters    The filters registered with WordPress to fire when the plugin loads.\n` +
                 `	 */\n` +
                 `	protected $filters;\n` +
                 `	/**\n` +
                 `	 * Initialize the collections used to maintain the actions and filters.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 */\n` +
                 `	public function __construct() {\n` +
                 `		$this->actions = array();\n` +
                 `		$this->filters = array();\n` +
                 `	}\n` +
                 `	/**\n` +
                 `	 * Add a new action to the collection to be registered with WordPress.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 * @param    string               $hook             The name of the WordPress action that is being registered.\n` +
                 `	 * @param    object               $component        A reference to the instance of the object on which the action is defined.\n` +
                 `	 * @param    string               $callback         The name of the function definition on the $component.\n` +
                 `	 * @param    int                  $priority         Optional. he priority at which the function should be fired. Default is 10.\n` +
                 `	 * @param    int                  $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1.\n` +
                 `	 */\n` +
                 `	public function add_action( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {\n` +
                 `		$this->actions = $this->add( $this->actions, $hook, $component, $callback, $priority, $accepted_args );\n` +
                 `	}\n` +
                 `	/**\n` +
                 `	 * Add a new filter to the collection to be registered with WordPress.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 * @param    string               $hook             The name of the WordPress filter that is being registered.\n` +
                 `	 * @param    object               $component        A reference to the instance of the object on which the filter is defined.\n` +
                 `	 * @param    string               $callback         The name of the function definition on the $component.\n` +
                 `	 * @param    int                  $priority         Optional. he priority at which the function should be fired. Default is 10.\n` +
                 `	 * @param    int                  $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1\n` +
                 `	 */\n` +
                 `	public function add_filter( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {\n` +
                 `		$this->filters = $this->add( $this->filters, $hook, $component, $callback, $priority, $accepted_args );\n` +
                 `	}\n` +
                 `	/**\n` +
                 `	 * A utility function that is used to register the actions and hooks into a single\n` +
                 `	 * collection.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 * @access   private\n` +
                 `	 * @param    array                $hooks            The collection of hooks that is being registered (that is, actions or filters).\n` +
                 `	 * @param    string               $hook             The name of the WordPress filter that is being registered.\n` +
                 `	 * @param    object               $component        A reference to the instance of the object on which the filter is defined.\n` +
                 `	 * @param    string               $callback         The name of the function definition on the $component.\n` +
                 `	 * @param    int                  $priority         The priority at which the function should be fired.\n` +
                 `	 * @param    int                  $accepted_args    The number of arguments that should be passed to the $callback.\n` +
                 `	 * @return   array                                  The collection of actions and filters registered with WordPress.\n` +
                 `	 */\n` +
                 `	private function add( $hooks, $hook, $component, $callback, $priority, $accepted_args ) {\n` +
                 `		$hooks[] = array(\n` +
                 `			'hook'          => $hook,\n` +
                 `			'component'     => $component,\n` +
                 `			'callback'      => $callback,\n` +
                 `			'priority'      => $priority,\n` +
                 `			'accepted_args' => $accepted_args\n` +
                 `		);\n` +
                 `		return $hooks;\n` +
                 `	}\n` +
                 `	/**\n` +
                 `	 * Register the filters and actions with WordPress.\n` +
                 `	 *\n` +
                 `	 * @since    ${version}\n` +
                 `	 */\n` +
                 `	public function run() {\n` +
                 `		foreach ( $this->filters as $hook ) {\n` +
                 `			add_filter( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );\n` +
                 `		}\n` +
                 `		foreach ( $this->actions as $hook ) {\n` +
                 `			add_action( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );\n` +
                 `		}\n` +
                 `	}\n` +
                 `}\n`;

    // Write the PHP loader class file
    fs.writeFile(`${base}/includes/class-${kebab}-loader.php`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}