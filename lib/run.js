/**
 * Lists and initiates all CLI actions.
 */

'use strict';

// Dependencies
const chalk = require( 'chalk' );
const clear = require( 'clear' );
const cli = require( './cli' );
const clui= require( 'clui' );
const Spinner = clui.Spinner;
const shell = require( 'shelljs' );

// Internal modules
const directory = require( './directory' );
const inquirer = require( './inquirer' );
const repo = require( './repo' );
const templates = require( './templates' );

// Helper functions
const checkOrigin = require( './helpers/checkOrigin' );
const files = require( './helpers/files' );
const getDirectory = require( './helpers/getDirectory' );
const installNpmDeps = require( '../lib/helpers/installNpmDeps' );
const prettyName = require( './helpers/prettyName' );
const getProperties = require( './helpers/getProperties' );

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
  const pluginProps = await getProperties.parseProps( baseSpecs, nameObj );
  templates.copyTemplates( nameObj, pluginProps );
  
  // 7. Install dependencies
  if ( pluginProps.admin ) {
    console.log( ` Running NPM to install the required dependencies.\n`);
    const status = new Spinner( 'This might take a few minutes....' )
    status.start();
    await installNpmDeps( nameObj.base );
    status.stop();
    console.log( `\n NPM packages installed.\n`);
  }
  
  // 8. Ask to set up local git repo and create it if so desired
  const repoSpecs = await inquirer.askCreateRepo();
  if ( repoSpecs.git_repo ) {
    shell.cd( pluginName );
    
    // 8a. Check if already repo
    if ( files.directoryExists( '.git' ) ) {
      console.log( chalk.yellow( 'Already a git repository' ) );
    } else {
      // 8b. Create .gitignore
      await repo.createGitignore( nameObj.kebab );

      // 8c. Set up local repo
      let getRepo;
      const uri = pluginProps.uri;
      const done = await repo.setUpRepo( pluginDir, uri, getRepo );
      if( done ) {
        const validRemote = await checkOrigin.checkRepo( uri );
        console.log( chalk.green( '\n Repo initialized!' ) );
        if ( validRemote ) {
          console.log( chalk.dim( ` Origin set to ${uri}. Don't forget to create the equivalent GitHub repo.` ) );
        } else {
          console.log( chalk.dim( " No valid GitHub repo supplied. Don't forget to set an origin when ready." ) );
        }
      }
    }
  }

  // 9. Success message
  success( nameObj, pluginDir );
};