'use strict';

const chalk = require( 'chalk' );
const clear = require( 'clear' );

const cli = require( './cli' );
const directory = require( './directory' );
const inquirer = require( './inquirer' );
const repo = require( './repo' );
const templates = require( './templates' );

// Helper functions
const files = require( './helpers/files' );
const getDirectory = require( './helpers/getDirectory' );
const prettyName = require( './helpers/prettyName' );

// Messages
const creatingDir = require( './messages/creatingDir' );
const welcome = require( './messages/welcome' );
const success = require( './messages/success' );

module.exports = async() => {
  // 1. Clear console
  clear();

  // 2. Get plugin name from CLI arguments and run various transformations on it
  const pluginName = cli();
  const nameObj = await prettyName.transformName( pluginName );
  const pluginDir = getDirectory( pluginName );

  // 3. Show welcome message
  welcome();
  creatingDir( nameObj, pluginDir );

  // 4. Create the plugin directory
  directory.makeDir( pluginName, pluginDir );
  directory.makeSubDirs( pluginName );

  // 5. Run inquirer to get project configs
  console.log( "Let's get some info about your plugin." )
  const baseSpecs = await inquirer.askPluginSpecs( nameObj ); 

  // 6. Copy over template files
  const pluginProps = await templates.getPluginProps( baseSpecs, nameObj );
  templates.copyTemplates( nameObj, pluginProps );
  
  // 7. Ask to set up local git repo and create it if so desired
  const repoSpecs = await inquirer.askCreateRepo();
  if ( repoSpecs.git_repo ) {
    // 7a. Check if already repo
    if ( files.directoryExists( '.git' ) ) {
      console.log( chalk.yellow( 'Already a git repository' ) );
    } else {
      // 7b. Create .gitignore
      await repo.createGitignore();

      // 7c. Set up local repo
      const done = await repo.setUpRepo();
      if( done ) {
        console.log( chalk.green( 'Repo initialized!' ) );
        console.log( chalk.dim( "Don't forget to set a remote branch." ) )
      }
    }
  }

  // 8. Success message
  success( nameObj, pluginDir );
};