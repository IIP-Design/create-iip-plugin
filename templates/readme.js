/**
 * Template for the plugin's readme file.
 *
 * @param {object} nameObj An object with various transformations of the plugin name.
 * @param {object} pluginProps An object containing all the plugin properties gather by inquirer.
 */

'use strict';

const fs = require( 'fs' );

module.exports = {

  writeReadme: ( nameObj, pluginProps ) => {

    const { base, kebab } = nameObj;
    const { name, admin } = pluginProps;

    const basicTree = `\`\`\`bash\n` +
                      `├── my-plugin.php\n` +
                      `        ├── admin\n` +
                      `        │   └── class-my-plugin-admin.php\n` +
                      `        ├── includes\n` +
                      `        │   ├── class-my-plugin.php\n` +
                      `        │   └── class-my-plugin-loader.php\n` +
                      `        └── public\n` +
                      `            └── class-my-plugin-public.php\n` +
                      `\`\`\``;

    const reactTree = `\`\`\`bash\n` +
                      `├── my-plugin.php\n` +
                      `        ├── admin\n` +
                      `        │   └── class-my-plugin-admin.php\n` +
                      `        │   └── js\n` +
                      `        │       ├── dist\n` +
                      `        │       ├── index.html\n` +
                      `        │       ├── package-lock.json\n` +
                      `        │       ├── package.json\n` +
                      `        │       ├── src\n` +
                      `        │       │   ├── App.jsx\n` +
                      `        │       │   ├── my-plugin-admin.css\n` +
                      `        │       │   └── index.js\n` +
                      `        │       ├── webpack.config.js\n` +
                      `        │       └── webpack.config.prod.js\n` +
                      `        ├── includes\n` +
                      `        │   ├── class-my-plugin.php\n` +
                      `        │   └── class-my-plugin-loader.php\n` +
                      `        └── public\n` +
                      `            └── class-my-plugin-public.php\n` +
                      `\`\`\``;

    const reactText = `The \`admin\` directory also includes everything necessary to build a React app located in the \`js\`. The entry point for this admin app is \`src/index.js\` and all code added to the admin app should reside in the \`src\` directory. The package also includes webpack to allow for running development server and bundling the admin code into a production build. To run the dev server navigate to the \`admin/js\` directory and run \`npm run start\`. This will run the server on localhost port 8080. To run a production build of the admin section run the command \`npm run build\` from the \`admin/js\` directory. This will create a production bundle that will be saved in the \`dist\` directory.\n` +
    `\n`;

    const tree = admin ? reactTree : basicTree;
    const react = admin ? reactText : '';

    const data = `# ${name}\n` +
                 `\n` +
                 `This plugin contains a \`${kebab}.php\`, which registers plugin and begins its execution. Additionally, there is an admin class (\`admin/class-${kebab}-admin.php\`) where all admin hooks are registered and the frontend class (\`public/class-${kebab}-public.php\`) where all public hooks are registered. The includes directory contains the main plugin class (\`include/class-${kebab}.php\`), which defines the core functionality of the plugin and the loader file (\`include/class-${kebab}-loader.php\`), which feeds the admin and public hooks in from their respective classes into the main class file.\n` +
                 `\n` +
                 `${react}` +
                 `## Plugin Structure\n` +
                 `\n` +
                 `${tree}`;

    // Write to a new file named README.md
    fs.writeFile(`${base}/README.md`, data, (err) => {
      if (err) throw err;
    });
  }
}