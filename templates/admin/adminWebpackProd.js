/**
 * Template for the production admin webpack config.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 * @param {string} kebab The plugin name in kebab-case.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeWebpackProd: ( base, kebab ) => {
    const data = `const webpack = require( 'webpack' );\n` +
                 `const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );\n` +
                 `\n` +
                 `module.exports = {\n` +
                 `  entry: './src/index.js',\n` +
                 `  module: {\n` +
                 `    rules: [\n` +
                 `      {\n` +
                 `        test: /\.(js|jsx)$/,\n` +
                 `        exclude: /node_modules/,\n` +
                 `        use: ['babel-loader']\n` +
                 `      },\n` +
                 `      {\n` +
                 `        test: /\.js$/,\n` +
                 `        exclude: /node_modules/,\n` +
                 `        use: ['babel-loader', 'eslint-loader']\n` +
                 `      },\n` +
                 `      {\n` +
                 `        test: /\.css$/,\n` +
                 `        use: ['style-loader', 'css-loader']\n` +
                 `      }\n` +
                 `    ]\n` +
                 `  },\n` +
                 `  resolve: {\n` +
                 `    extensions: [\n` +
                 `      '*', '.js', '.jsx'\n` +
                 `    ]\n` +
                 `  },\n` +
                 `  output: {\n` +
                 `    path: __dirname,\n` +
                 `    publicPath: '/',\n` +
                 `    filename: 'dist/${kebab}-admin.min.js'\n` +
                 `  },\n` +
                 `  optimization: {\n` +
                 `    minimizer: [\n` +
                 `      new UglifyJsPlugin( {\n` +
                 `        uglifyOptions: {\n` +
                 `          warnings: false,\n` +
                 `          mangle: true,\n` +
                 `          keep_fnames: false\n` +
                 `        }\n` +
                 `      } )\n` +
                 `    ]\n` +
                 `  }\n` +
                 `};`

    // Write the admin class file where all admin hooks will be added
    fs.writeFile(`${base}/admin/js/webpack.config.prod.js`, data, (err) => {
      if (err) throw err;
    });
  }
};