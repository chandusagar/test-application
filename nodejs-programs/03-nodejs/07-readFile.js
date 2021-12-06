const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

console.log( __filename );
console.log( __dirname );

// async non-blocking function
// if we do not specify the encoding, we get a buffer object (like an array of raw bytes)
fs.readFile( path.join( __dirname, 'package.json' ), 'utf8', ( error, contents ) => {
    if( error ) {
        console.log( chalk.red( error.message ) );
        return;
    }

    console.log( contents );
});

console.log( 'after calling fs.readFile' );