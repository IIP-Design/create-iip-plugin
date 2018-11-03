'use strict';

const fs = require( 'fs' );

module.exports = {

  writeComposer: ( pluginDir ) => {
    const data = `{\n` +
                 `   "name": "iip-design/${pluginDir}",\n` +
                 `   "type": "wordpress-plugin",\n` +
                 `   "description" : "<% pluginDesc %>",\n` +
                 `   "authors": [\n` +
                 `     {\n` +
                 `        "name": "<% pluginAuthor %>"\n` +
                 `     }\n` +
                 `   ],\n` +
                 `   "minimum-stability": "stable",\n` +
                 `   "require": {\n` +
                 `     "composer/installers": "~1.0"\n` +
                 `   }\n` +
                 `}`;

    // write to a new file named composer.json
    fs.writeFile(`${pluginDir}/composer.json`, data, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
    });
  }
}