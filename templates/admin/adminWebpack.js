/**
 * Template for the development admin webpack config.
 *
 * @param {string} base The plugin name as entered by the user/base directory for the plugin.
 * @param {string} kebab The plugin name in kebab-case.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeWebpack: ( base, kebab ) => {
    const data = `const webpack = require( 'webpack' );\n` +
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
                 `    filename: 'dist/${kebab}-admin.js'\n` +
                 `  },\n` +
                 `  plugins: [new webpack.HotModuleReplacementPlugin()],\n` +
                 `  devServer: {\n` +
                 `    contentBase: './',\n` +
                 `    hot: true\n` +
                 `  }\n` +
                 `};`

    // Write the webpack file for the plugin's backend development build
    fs.writeFile(`${base}/admin/js/webpack.config.js`, data, (err) => {
      if (err) throw err;
    });
  }
};
