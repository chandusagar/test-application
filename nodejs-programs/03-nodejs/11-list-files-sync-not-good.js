/**
 * EXERCISE:
 * List all files in some folder
 */
const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

// sync (blocking) - next line will not execute till the file names are read
try {
    const files = fs.readdirSync( __dirname, { encoding: 'utf-8' } );
    console.log( files );
} catch( error ) {
    console.log( chalk.red( error.message ) );
}

console.log( 'after call to readdirSync' );