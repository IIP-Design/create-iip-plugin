'use strict';

const fs = require( 'fs' );

module.exports = {

  writeHtml: ( base, title, kebab ) => {
    const data = `<!DOCTYPE html>\n` +
                 `<html lang="en">\n` +
                 `\n` +
                 `  <head>\n` +
                 `\n` +
                 `    <meta charset="UTF-8">\n` +
                 `    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n` +
                 `    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n` +
                 `    <title>${title} Admin Test Page</title>\n` +
                 `\n` +
                 `  </head>\n` +
                 `\n` +
                 `  <body>\n` +
                 `\n` +
                 `    <!-- This index page is included for the purposes of development -->\n` +
                 `    <div id="${kebab}-admin" style="max-width: 1000px; margin: 0 auto"></div>\n` +
                 `    <script src="dist/${kebab}-admin.js"></script>\n` +
                 `\n` +
                 `  </body>\n` +
                 `\n` +
                 `</html>`;

    // Write the index.html file used to test the backend React app
    fs.writeFile(`${base}/admin/js/index.html`, data, (err) => {
      if (err) throw err;
    });
  }
}