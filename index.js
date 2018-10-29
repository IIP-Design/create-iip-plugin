#!/usr/bin/env node

const chalk = require( 'chalk' );
const clear = require( 'clear' );
const figlet = require( 'figlet' );

const files = require( './lib/files' );
const inquirer = require( './lib/inquirer' );
const repo = require( './lib/repo' );

clear();

console.log(
  chalk.green(
    figlet.textSync( 'Create IIP Plugin', {
      font: 'Big Money-ne',
      horizontalLayout: 'default'
    })
  )
)

const run = async () => {
  const specs = await inquirer.askPluginSpecs();
  console.log(specs);
}

run();