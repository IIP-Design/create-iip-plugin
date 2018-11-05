/**
 * Copies over the boilerplate files.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 * @param {object} baseSpecs Raw user input gathered by inquirer.
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
      // await installNpmDeps( nameObj, pluginProps );
    } else {
      // Write non-React admin
      mainClass.writeClass( nameObj, pluginProps );
      indices.writeIndices( base );
      adminClass.writeAdmin( nameObj );
    }
  },
  
  getPluginProps: ( baseSpecs, nameObj ) => {
    const { 
      plugin_name,
      plugin_changed_name,
      plugin_uri,
      plugin_description,
      plugin_version,
      plugin_author,
      plugin_changed_author,
      plugin_license,
      plugin_custom_license,
      plugin_text_domain,
      plugin_changed_text_domain,
      plugin_admin
    } = baseSpecs;

    const { base, title, kebab } = nameObj;

    const pluginName = plugin_name ? title : plugin_changed_name;
    const pluginURI = plugin_uri ? `https://github.com/IIP-Design/${base}` : '';
    const pluginDesc = plugin_description;
    const pluginVersion = plugin_version;
    const pluginAuthor = !plugin_author ? 'U.S. Department of State, IIP Office of Design <designdevops@america.gov>': plugin_changed_author;
    const pluginDomain = plugin_text_domain ? kebab : plugin_changed_text_domain;
    const pluginAdmin = plugin_admin;
    let pluginLicense;
    let pluginLicenseURI;
    
    switch ( plugin_license ) {
      case 'GPLv2':
        pluginLicense = 'GNU General Public License v2.0';
        pluginLicenseURI = 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html';
        break;
      case 'MIT':
        pluginLicense = 'MIT';
        pluginLicenseURI = 'https://opensource.org/licenses/MIT';
        break;
      case 'Apache':
        pluginLicense = 'Apache license 2.0';
        pluginLicenseURI = 'https://www.apache.org/licenses/LICENSE-2.0';
        break;
      case 'other':
        pluginLicense = plugin_custom_license;
        pluginLicenseURI = '';
        break;
      case 'none':
        pluginLicense = '';
        pluginLicenseURI = '';
        break;
    };

    const properties = {
      name: pluginName,
      uri: pluginURI,
      description: pluginDesc,
      version: pluginVersion,
      author: pluginAuthor,
      domain: pluginDomain,
      license: pluginLicense,
      licenseUri: pluginLicenseURI,
      admin: pluginAdmin
    };

    return properties;
  }
};