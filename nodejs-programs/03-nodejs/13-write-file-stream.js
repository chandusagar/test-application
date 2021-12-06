const fs = require( 'fs' );
const path = require( 'path' );

// a write stream - a means to write to the file chunk-by-chunk
const ws = fs.createWriteStream( path.join( __dirname, 'hello.txt' ), { encoding: 'utf8' } );

for( let i = 0; i < 1000000; i++ ) {
    ws.write( 'Hello world ' + ( i + 1 ) + '\n' );
};

// closes the file stream
ws.end();