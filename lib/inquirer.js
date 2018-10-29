const inquirer = require( 'inquirer' );
const files = require( './files' );

module.exports = {
  askPluginSpecs: () => {
    const questions = [
      {
        name: 'plugin name',
        type: 'input',
        message: 'What would you like to call your plugin?',
        validate: function( value ) {
          if ( value.length ) {
            return true;
          } else {
            return 'You must name your plugin.';
          }
        }
      },
      {
        name: 'plugin description',
        type: 'input',
        message: 'Provide a short description for this plugin:'
      },
      {
        name: 'plugin author',
        type: 'confirm',
        message: 'Is this the correct author for this plugin? "IIP Office of Design <designdevops@america.gov>"',
        default: true
      },
      {
        name: 'plugin version',
        type: 'input',
        message: 'Enter an initial version - semantic versioning is recommended (ex: 1.0.0):'
      },
      {
        name: 'plugin license',
        type: 'list',
        message: 'Please select a license for your plugin:',
        choices: [ 'GPLv2', 'MIT', 'Apache', 'none' ],
        default: 'GPLv2'
      }
    ];

    return inquirer.prompt( questions );
  },

  askCreateRepo: () => {
    const questions = [
      {
        name: 'git repo',
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
        name: 'ignore',
        type: 'checkbox',
        message: 'Select the files/folder you want to add to gitignore:',
        choices: filelist,
        default: [ 'node_modules/', 'npm-debug.log*', '.env', '.vscode', '.DS_Store' ]
      }
    ];

    return inquirer.prompt( questions );
  }
}