/**
 * Parses user responses to inquirer and saves resulting plugin props to an object.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} baseSpecs Raw user input gathered by inquirer.
 * @returns {object} A properties object containing all the plugin information.
 */

'use strict';

module.exports = {
  parseProps: ( baseSpecs, nameObj ) => {
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
    const pluginURI = plugin_uri ? `https://github.com/IIP-Design/${base}` : plugin_changed_name;
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
}