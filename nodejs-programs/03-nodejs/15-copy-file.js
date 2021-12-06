// EXERCISE:
// node 15-copy-file package.json package-copy.json
// You should use stream read and write to copy the file
// When a chunk is read from source file it is written to destination file
const fs = require( 'fs' );
const path = require( 'path' );

// Let's assume src, dest is provided with respect to the current folder
const [ , , src, dest ] = process.argv;

const rs = fs.createReadStream( path.join( __dirname, src ), 'utf8' );
const ws = fs.createWriteStream( path.join( __dirname, dest ), { encoding: 'utf8' } );

rs.on( 'data', chunk => {
    ws.write( chunk );
});

// end event fires after the entire file has been read
rs.on( 'end', () => {
    // always good idea to close the file for writing after it is written
    ws.end();
});

rs.on( 'error', error => {
    console.log( error.message );
});

rs.read();