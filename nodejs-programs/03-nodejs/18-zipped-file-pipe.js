// Reference: For more info on pipe() please read https://nodejs.org/en/docs/guides/backpressuring-in-streams/
const fs = require( 'fs' );
const path = require( 'path' );

const { createGzip } = require( 'zlib' );

// Let's assume src, dest is provided with respect to the current folder
const [ , , src, dest ] = process.argv;

// create a gzip "transform" stream (both read and write stream)
const gzip = createGzip();
const rs = fs.createReadStream( path.join( __dirname, src ), 'utf8' );
const ws = fs.createWriteStream( path.join( __dirname, dest ) );

// takes care of case where read happens much faster then write (it will pause the reading till write is complete, and then resume reading)
rs.pipe( gzip ).pipe( ws );

// skipped error handling on rs, ws (you need to handle error events)