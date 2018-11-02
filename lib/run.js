'use strict';

const chalk = require( 'chalk' );
const clear = require( 'clear' );
const figlet = require( 'figlet' );

const files = require( './files' );
const inquirer = require( './inquirer' );
const repo = require( './repo' );

module.exports = async() => {
  // 1. Clear console
  clear();

  // 2. Show welcome message
  console.log(
    chalk.green(
      figlet.textSync( 'IIP Plugins', {
        font: 'Big Money-ne',
        horizontalLayout: 'default'
      })
    )
  )

  // 3. Run inquirer to get project configs
  const baseSpecs = await inquirer.askPluginSpecs();
  console.log(baseSpecs);
  const repoSpecs = await inquirer.askCreateRepo();
  
  // Copy over template files
  
  // 4. Set up repo if desired
  if ( repoSpecs.git_repo ) {
    // 4a. Check if already repo
    if ( files.directoryExists( '.git' ) ) {
      console.log( chalk.yellow( 'Already a git repository' ) );
    } else {
      // 4b. Create .gitignore
      await repo.createGitignore();

      // 4c. Set up local repo
      const done = await repo.setUpRepo();
      if( done ) {
        console.log( chalk.green( 'Repo initialized' ) );
      }
    }
  }
}