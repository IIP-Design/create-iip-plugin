/**
 * Copies over the boilerplate files.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

'use strict';

const directory = require( './directory' );

// Import base templates
const adminClass = require( '../templates/admin/admin' );
const changelog = require( '../templates/changelog' );
const composer = require( '../templates/composer' );
const indices = require( '../templates/indices' );
const loader = require( '../templates/loader' );
const mainClass = require( '../templates/mainClass' );
const plugin = require( '../templates/plugin' );
const frontend = require( '../templates/frontend' );
const readme = require( '../templates/readme' );

// Helpers
const buildAdminReact = require( '../lib/helpers/buildAdminReact' );

// Messages
const writingFile = require( '../lib/messages/writingFiles' );

module.exports = {
  copyTemplates: ( nameObj, pluginProps ) => {
    const { base, upperSnake } = nameObj;
    const { admin } = pluginProps;

    writingFile( upperSnake );

    // Write the informational filesmodule.exports = {
    changelog.writeChangelog( base );
    composer.writeComposer( base, pluginProps );
    readme.writeReadme( base, pluginProps );
    
    // Write PHP class files
    frontend.writeFrontend( nameObj );
    loader.writeLoader( nameObj, pluginProps);
    plugin.writePlugin( nameObj, pluginProps );

    // Write admin files
    if ( admin ) {
      // Write React-relevant files
      directory.makeReactDirs( base, admin );
      mainClass.writeClass( nameObj, pluginProps );
      buildAdminReact.buildAdmin( nameObj, pluginProps );
      indices.writeIndices( base);
    } else {
      // Write non-React admin
      mainClass.writeClass( nameObj, pluginProps );
      indices.writeIndices( base );
      adminClass.writeAdmin( nameObj );
    }
  }
};