'use strict';

// Import base templates
const adminReact = require( '../../templates/admin/adminReact' );
const adminApp = require( '../../templates/admin/adminApp' );
const adminBabel = require( '../../templates/admin/adminBabel' );
const adminCss = require( '../../templates/admin/adminCss' );
const adminEslint = require( '../../templates/admin/adminEslint' );
const adminIndex = require( '../../templates/admin/adminIndex' );
const adminIndexHtml = require( '../../templates/admin/adminIndexHtml' );
const adminPackage = require( '../../templates/admin/adminPackage' );
const adminWebpack = require( '../../templates/admin/adminWebpack' );
const adminWebpackProd = require( '../../templates/admin/adminWebpackProd' );

module.exports = {
  buildAdmin: ( nameObj, pluginProps ) => {
    const { base, title, kebab } = nameObj;
    const { version } = pluginProps;
    
    adminReact.writeAdmin( nameObj );
    adminApp.writeApp( base );
    adminBabel.writeBabel( base );
    adminCss.writeCss( base, kebab );
    adminEslint.writeEslint( base );
    adminIndex.writeIndex( base, kebab );
    adminIndexHtml.writeHtml( base, title, kebab );
    adminPackage.writePackage( base, kebab, version );
    adminWebpack.writeWebpack( base, kebab );
    adminWebpackProd.writeWebpackProd( base, kebab );
  }
};