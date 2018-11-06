# Create IIP Plugin

Create IIP Plugin is a command line interface that can be used to bootstrap a WordPress plugin. Running the tool will:

1. Determine the plugin name from provided CLI argument
1. Create the plugin directory and all required sub-directories
1. Ask a series of question to get the project details
1. Copy over template files customized based on the plugin name
1. Install any dependencies (if required)
1. Ask to set up local git repo and create it if so desired

## Installing the CLI Tool

Prior to using this CLI tool you must install it on your machine (note that you must also have [Node.js](https://nodejs.org/en/) installed for the tool to work). To install the CLI tool, enter the following commands in your terminal:

```
git clone git@github.com:IIP-Design/create-iip-plugin.git
cd create-iip-plugin
npm link
```

This will clone the tool's git repository to your computer, enter that cloned directory, and then link the this tool to the command `create-iip-plugin`. Once you've done this you can run `create-iip-plugin` anywhere on your system to begin the CLI tool.

## Using the CLI Tool

To start bootstrapping your new plugin, simply enter `create-iip-plugin my-plugin` in the directory where you want the plugin to reside (replacing `my-plugin` with the desired plugin name). You will see a series of prompts to gather information that will be used to configure your plugin. Once you have answered the prompts the tool will construct your new plugin.

This plugin will have a structure as described below and include an initial README, the beginnings of a CHANGELOG, and a preconfigured composer.json.

## Plugin Structure

There are two principle configurations that the tool provides - a basic varient and one set up for a React-powered admin area. The basic structure creates a PHP file using the plugin name, which registers plugin and begins its execution. It then breaks the rest of the plugin into three parts, namely 1) the admin class (where all admin hooks are registered), 2) the includes directory (which contains the main plugin class and the loader), and 3) the public class (where all public hooks are registered). In the includes directory, the main plugin class defines the core functionality of the plugin and the loader file feeds the admin and public hooks in from their respective classes into the main class file.

**Basic Structure:**
```bash
├── my-plugin.php
├── admin
│   └── class-my-plugin-admin.php
├── includes
│   ├── class-my-plugin.php
│   └── class-my-plugin-loader.php
└── public
    └── class-my-plugin-public.php
```

The React-admin variant provides everything necessary to build a React app admin. As you can see from the directory tree below, the basic operation of the plugin remains the same. The only difference is within the admin sub-directory where there is now a `js` directory containing all the necessary components to build a React app.

**React Admin Structure:**
```bash
├── my-plugin.php
├── admin
│   ├── class-my-plugin-admin.php
│   └── js
│       ├── dist
│       ├── index.html
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   ├── App.jsx
│       │   ├── my-plugin-admin.css
│       │   └── index.js
│       ├── webpack.config.js
│       └── webpack.config.prod.js
├── includes
│   ├── class-my-plugin.php
│   └── class-my-plugin-loader.php
└── public
    └── class-my-plugin-public.php
```

The entry point for this admin app is `src/index.js` and all code added to the admin app should reside in the `src` directory. The package also includes webpack to allow for running development server and bundling the admin code into a production build. To run the dev server navigate to the `admin/js` directory and run `npm run start`. This will run the server on localhost port 8080. To run a production build of the admin section run the command `npm run build` from the `admin/js` directory. This will create a production bundle that will be saved in the `dist` directory.