/**
 * Install the admin dependencies.
 *
 * @param  {string} base The plugin name entered by the user/base directory for the plugin.
 */

'use strict';

const execa = require( 'execa' );
const shell = require( 'shelljs' );

module.exports = ( base ) => {
    const path = ( `${base}/admin/js` );

    shell.cd( path );
    
    // Install latest exact version of cgb-scripts.
    return new Promise( async resolve => {
      await execa( 'npm', [ 'install', '--save', 'react'] );
      console.log( 'react installed' );
      await execa( 'npm', [ 'install', '--save', 'react-dom'] );
      console.log( 'react-dom installed' );
      await execa( 'npm', [ 'install', '--save', 'prop-types'] );
      console.log( 'prop-types installed' );
      await execa( 'npm', [ 'install', '--save-dev', '@babel/core'] );
      console.log( '@babel/core installed' );
      await execa( 'npm', [ 'install', '--save-dev', '@babel/preset-env'] );
      console.log( '@babel/preset-env installed' );
      await execa( 'npm', [ 'install', '--save-dev', '@babel/preset-react'] );
      console.log( '@babel/preset-react installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'babel-eslint'] );
      console.log( 'babel-eslint installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'babel-loader'] );
      console.log( 'babel-loader installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'css-loader'] );
      console.log( 'css-loader installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint'] );
      console.log( 'eslint installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint-config-airbnb'] );
      console.log( 'eslint-config-airbnb installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint-loader'] );
      console.log( 'eslint-loader installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint-plugin-import'] );
      console.log( 'eslint-plugin-import installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint-plugin-jsx-a11y'] );
      console.log( 'eslint-plugin-jsx-a11y installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'eslint-plugin-react'] );
      console.log( 'eslint-plugin-react installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'react-hot-loader'] );
      console.log( 'react-hot-loader installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'style-loader'] );
      console.log( 'style-loader' );
      await execa( 'npm', [ 'install', '--save-dev', 'uglifyjs-webpack-plugin'] );
      console.log( 'uglifyjs-webpack-plugin installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'webpack'] );
      console.log( 'webpack installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'webpack-cli'] );
      console.log( 'webpack-cli installed' );
      await execa( 'npm', [ 'install', '--save-dev', 'webpack-dev-server'] );
      console.log( 'webpack-dev-server installed' );
      resolve( true );
    } );
};