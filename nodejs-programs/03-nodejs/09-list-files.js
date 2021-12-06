/**
 * EXERCISE:
 * List all files in some folder
 */
const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

// async (non-blocking)
fs.readdir( __dirname, { encoding: 'utf-8' }, ( error, files ) => {
    if( error ) {
        console.log( chalk.red( error.message ) );
        return;
    }

    console.log( files );
});

console.log( 'after call to readdir' );