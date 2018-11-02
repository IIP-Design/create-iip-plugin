const inquirer = require( 'inquirer' );

module.exports = {
  askPluginSpecs: ( pluginDir, pluginTitle, pluginTextDomain ) => {
    
    const questions = [
      {
        name: 'plugin_name',
        type: 'confirm',
        message: `Do you like the plugin name ${pluginTitle}?`,
        default: true
      },
      {
        when: function( response ) {
          return !response.plugin_name;
        },
        name: 'plugin_changed_name',
        type: 'input',
        message: 'What name would you prefer?',
        validate: function( value ) {
          if ( value.length ) {
            return true;
          } else {
            return 'You must name your plugin.';
          }
        }
      },
      {
        name: 'plugin_uri',
        type: 'confirm',
        message: `Will the plugin reside in the following repository: https://github.com/IIP-Design/${pluginDir}?`,
        default: true
      },
      {
        name: 'plugin_description',
        type: 'input',
        message: 'Please provide a short description for this plugin:'
      },
      {
        name: 'plugin_version',
        type: 'input',
        message: 'Enter an initial version - semantic versioning is recommended (ex: 1.0.0):',
        default: '1.0.0'
      },
      {
        name: 'plugin_author',
        type: 'confirm',
        message: 'The default author for this plugin is "U.S. Department of State, IIP Office of Design <designdevops@america.gov>". Would you like to change this?',
        default: false
      },
      {
        when: function( response ) {
          return response.plugin_author;
        },
        name: 'plugin_change_author',
        type: 'input',
        message: 'What author should we use?'
      },
      {
        name: 'plugin_license',
        type: 'list',
        message: 'Please select a license for your plugin (the default is GPLv2):',
        choices: [ 'GPLv2', 'MIT', 'Apache', 'other', 'none' ],
        default: 'GPLv2'
      },
      {
        when: function( response ) {
          return response.plugin_license === 'other';
        },
        name: 'plugin_custom_license',
        type: 'input',
        message: 'Enter your license type:'
      },
      {
        name: 'plugin_text_domain',
        type: 'confirm',
        message: `Would you like to use "iip-${pluginTextDomain}" as the plugin's text domain?`
      },
      {
        when: function( response ) {
          return !response.plugin_text_domain;
        },
        name: 'plugin_change_text_domain',
        type: 'input',
        message: 'Enter your preferred text domain:'
      }
    ];

    return inquirer.prompt( questions );
  },

  askCreateRepo: () => {
    const questions = [
      {
        name: 'git_repo',
        type: 'confirm',
        message: 'Would you like to initialize this project as a git repo?',
        default: true
      }
    ];

    return inquirer.prompt( questions );
  },

  askIgnoreFiles: ( fileList ) => {
    const questions = [
      {
        name: 'git_ignore',
        type: 'checkbox',
        message: 'Select the files/folder you want to add to gitignore (some files will be added by default):',
        choices: fileList,
        default: [ 'node_modules/', 'npm-debug.log*', '.env', '.vscode', '.DS_Store' ]
      }
    ];

    return inquirer.prompt( questions );
  }
}