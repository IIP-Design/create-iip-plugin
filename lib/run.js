'use strict';

const chalk = require( 'chalk' );
const clear = require( 'clear' );

const cli = require( './cli' );
const creatingDir = require( './messages/creatingDir' );
const directory = require( './directory' );
const files = require( './helpers/files' );
const getDirectory = require( './helpers/getDirectory' );
const inquirer = require( './inquirer' );
const prettyName = require( './helpers/prettyName')
const repo = require( './repo' );
const welcome = require( './messages/welcome' );

module.exports = async() => {
  // 1. Clear console
  clear();

  // 2. Get plugin name from CLI arguments and run various transformations on it
  const pluginName = cli();
  const pluginTitle = await prettyName.getTitleCase( pluginName );
  const pluginTextDomain = await prettyName.getKebabCase( pluginName );

  const pluginDir = await getDirectory( pluginName );

  // 3. Show welcome message
  welcome();
  creatingDir( pluginTitle, pluginDir );

  // 4. Create the plugin directory
  directory( pluginName, pluginDir );

  // 5. Run inquirer to get project configs
  console.log( "Let's get some info about your plugin." )
  const baseSpecs = await inquirer.askPluginSpecs( pluginName, pluginTitle, pluginTextDomain );
  console.log(baseSpecs);  

  // Copy over template files
  
  // 6. Ask to set up git repo and create it if so desired
  const repoSpecs = await inquirer.askCreateRepo();
  if ( repoSpecs.git_repo ) {
    // 6a. Check if already repo
    if ( files.directoryExists( '.git' ) ) {
      console.log( chalk.yellow( 'Already a git repository' ) );
    } else {
      // 6b. Create .gitignore
      await repo.createGitignore();

      // 6c. Set up local repo
      const done = await repo.setUpRepo();
      if( done ) {
        console.log( chalk.green( 'Repo initialized!' ) );
        console.log( chalk.dim( "Don't forget to set a remote branch." ) )
      }
    }
  }
}