const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

// default behaviour is to overwrite an existing file
fs.writeFile( path.join( __dirname, '../hello.txt' ), (new Date()).toTimeString() + '\n', { encoding: 'utf-8', flag: 'a' }, error => {
    if( error ) {
        console.log( chalk.red( error.message ) );
        return;
    }

    console.log( chalk.green( 'File hello.txt was successfully written to' ) );
});

console.log( 'after call to fs.writeFile' );