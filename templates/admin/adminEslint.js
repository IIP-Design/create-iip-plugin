'use strict';

const fs = require( 'fs' );

module.exports = {

  writeEslint: ( base ) => {
    const data = `module.exports = {\n` +
                 `  extends: ['airbnb'],\n` +
                 `  rules: {\n` +
                 `    'array-bracket-newline': ['warn', { multiline: true, minItems: 3 }],\n` +
                 `    'comma-dangle': ['warn', 'never'],\n` +
                 `    'consistent-return': 0,\n` +
                 `    'import/first': 0,\n` +
                 `    'import/no-extraneous-dependencies': [\n` +
                 `      'warn',\n` +
                 `      {\n` +
                 `        devDependencies: true,\n` +
                 `        optionalDependencies: true,\n` +
                 `        peerDependencies: true\n` +
                 `      }\n` +
                 `    ],\n` +
                 `    'import/no-unresolved': [2, { ignore: ['.css$'] }],\n` +
                 `    'import/prefer-default-export': 0,\n` +
                 `    'jsx-a11y/anchor-is-valid': [\n` +
                 `      'error',\n` +
                 `      {\n` +
                 `        components: ['Link'],\n` +
                 `        specialLink: ['to', 'hrefLeft', 'hrefRight'],\n` +
                 `        aspects: ['noHref', 'invalidHref', 'preferButton']\n` +
                 `      }\n` +
                 `    ],\n` +
                 `    'max-len': [1, 120, 2, { ignoreComments: true }],\n` +
                 `    'no-console': 0,\n` +
                 `    'no-param-reassign': 0,\n` +
                 `    'no-underscore-dangle': 0,\n` +
                 `    'no-unused-vars': ['warn', { vars: 'local', args: 'none' }],\n` +
                 `    'react/forbid-prop-types': 0,\n` +
                 `    'react/jsx-curly-spacing': [2, { when: 'always', children: true }],\n` +
                 `    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],\n` +
                 `    'react/require-default-props': 0,\n` +
                 `    'space-in-parens': ['warn', 'always']\n` +
                 `  },\n` +
                 `  env: {\n` +
                 `    browser: true,\n` +
                 `    jest: true,\n` +
                 `    es6: true,\n` +
                 `    node: true\n` +
                 `  },\n` +
                 `  parser: 'babel-eslint',\n` +
                 `  parserOptions: {\n` +
                 `    ecmaFeatures: {\n` +
                 `      jsx: true\n` +
                 `    }\n` +
                 `  },\n` +
                 `  overrides: [\n` +
                 `    {\n` +
                 `      files: '*.test.js',\n` +
                 `      rules: {\n` +
                 `        'no-unused-expressions': 'off',\n` +
                 `        'import/no-unresolved': 'off'\n` +
                 `      }\n` +
                 `    }\n` +
                 `  ]\n` +
                 `};`;

    // Write the ESLint file for the admin React app
    fs.writeFile(`${base}/admin/js/.eslintrc.js`, data, (err) => {
      if (err) throw err;
    });
  }
};