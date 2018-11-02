#!/usr/bin/env node

'use strict';

// Ends application on unhandled rejections
process.on( 'unhandledRejection', err => {
	throw err;
} );

// Run the entire program with async/await functions.
const run = require( './lib/run' );
run();