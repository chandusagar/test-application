const fs = require('fs');
const http = require( 'http' );
const path = require( 'path' );

const server = http.createServer();

const PORT = process.env.PORT || 3000;

server.on( 'request', ( req, res ) => {
    let buffer = '';

    req.on( 'data', chunk => {
        buffer += chunk;
    });

    req.on( 'end', () => {
        const data = JSON.parse( buffer );

        const ws = fs.createWriteStream( path.join( __dirname, '22-users.txt' ), { encoding: 'utf8', flags: 'a' } );
        ws.write( '\n' + JSON.stringify( data ) );

        res.end( 'You data is received' );
    });
});

server.on( 'listening', () => {
    console.log( `Started http://localhost:${PORT}` );
});

server.on( 'error', error => {
    console.error( error.message );
});

server.listen( PORT );

