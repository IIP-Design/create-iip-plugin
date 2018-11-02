'use strict';

const chalk = require( 'chalk' );
const figlet = require( 'figlet' );

module.exports = () =>  {

  console.log(
    chalk.green(
      figlet.textSync( 'IIPlugins', {
        font: 'Big Money-ne',
        horizontalLayout: 'default'
      })
    )
  )
  console.log( `\n Let's build your plugin! \n` )
}