/**
 * EXERCISE:
 * List all files in some folder
 */
const fs = require( 'fs/promises' );
const path = require( 'path' );
const chalk = require( 'chalk' );

fs.readdir( __dirname, { encoding: 'utf-8' } )
    .then( files => console.log( files ) )
    .catch(error => console.log( chalk.red( error.message ) ) );