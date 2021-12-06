const fs = require('fs');
const http = require( 'http' );
const path = require( 'path' );

const server = http.createServer();

const PORT = process.env.PORT || 3000;

// when server receives an HTTP request, it fires a 'request' event
// res is a writable stream
server.on( 'request', ( req, res ) => {
    const rs = fs.createReadStream( path.join( __dirname, '17-sample.html' ), 'utf8' );
    rs.pipe( res );
});

// when server starts up successfully, it fires a 'listening' event
server.on( 'listening', () => {
    console.log( `Started http://localhost:${PORT}` );
});

// when server cannot start up successfully, it fires an 'error' event
server.on( 'error', error => {
    console.error( error.message );
});

server.listen( PORT );

