'use strict';

const fs = require( 'fs' );

module.exports = {

  writeChangelog: ( pluginDir ) => {
    const data = `# Change Log\n` +
                 `##### All notable changes to this project will be documented in this file.\n` +
                 `\n` +
                 `The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\n` +
                 `and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n` +
                 `\n` +
                 `## Initial Release\n`;
  
    // Write the initial changelog
    fs.writeFile(`${pluginDir}/CHANGELOG.md`, data, (err) => {
      if (err) throw err;
    });
  }
}