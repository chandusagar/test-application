const fs = require( 'fs' );
const path = require( 'path' );

// create the read stream -> a "straw"
const rs = fs.createReadStream( path.join( __dirname, 'packag.json' ), 'utf8' );

// when the read stream reads a chunk of data, it emits a "data" event
rs.on( 'data', chunk => {
    console.log( chunk );
});

rs.on( 'error', error => {
    console.log( error.message );
});

// start reading the file chunk-by-chunk
rs.read();

console.log( 'after call to rs.read()' );