'use strict';

const chalk = require( 'chalk' );
const clear = require( 'clear' );

const cli = require( './cli' );
const files = require( './files' );
const inquirer = require( './inquirer' );
const repo = require( './repo' );
const welcome = require( './messages/welcome' );

module.exports = async() => {
  // 1. Clear console
  clear();

  // 2. Get plugin name from CLI arguments
  const pluginName = cli();

  // 3. Show welcome message
  welcome();

  // 4. Run inquirer to get project configs
  const baseSpecs = await inquirer.askPluginSpecs( pluginName );
  console.log(baseSpecs);
  const repoSpecs = await inquirer.askCreateRepo();
  
  // Copy over template files
  
  // 5. Set up repo if desired
  if ( repoSpecs.git_repo ) {
    // 5a. Check if already repo
    if ( files.directoryExists( '.git' ) ) {
      console.log( chalk.yellow( 'Already a git repository' ) );
    } else {
      // 5b. Create .gitignore
      await repo.createGitignore();

      // 5c. Set up local repo
      const done = await repo.setUpRepo();
      if( done ) {
        console.log( chalk.green( 'Repo initialized' ) );
      }
    }
  }
}