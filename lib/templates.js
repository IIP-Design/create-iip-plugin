'use strict';

const shell = require( 'shelljs' );

// Import base templates
const changelog = require( '../templates/changelog' );
const composer = require( '../templates/composer' );
const plugin = require( '../templates/plugin' );
const readme = require( '../templates/readme' );

module.exports = {
  copyTemplates: ( pluginDir, pluginTextDomain ) => {
    changelog.writeChangelog( pluginDir );
    composer.writeComposer( pluginDir );
    plugin.writePlugin( pluginDir, pluginTextDomain )
    readme.writeReadme( pluginDir );
  },
  
  rename: ( baseSpecs, pluginTitle, pluginDir, pluginTextDomain ) => {
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
      plugin_changed_text_domain
    } = baseSpecs;

    const pluginName = plugin_name ? pluginTitle : plugin_changed_name;
    const pluginURI = plugin_uri ? `https://github.com/IIP-Design/${pluginDir}` : '';
    const pluginDesc = plugin_description;
    const pluginVersion = plugin_version;
    const pluginAuthor = !plugin_author ? 'U.S. Department of State, IIP Office of Design <designdevops@america.gov>': plugin_changed_author;
    const pluginDomain = plugin_text_domain ? `iip-${pluginTextDomain}` : plugin_changed_text_domain;
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
    }

    const root = process.cwd();
    const files = [
      ...shell.ls( root + '/templates/*' )
    ]

    
  console.log(files);
  // console.log(pluginName, pluginURI, pluginDesc, pluginVersion, pluginAuthor, pluginDomain, pluginLicense, pluginLicenseURI ); 
  }
};