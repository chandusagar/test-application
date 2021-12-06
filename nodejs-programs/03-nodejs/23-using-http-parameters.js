const fs = require('fs');
const http = require( 'http' );
const path = require( 'path' );
const url = require( 'url' );

const server = http.createServer();

const PORT = process.env.PORT || 3000;

server.on( 'request', ( req, res ) => {
    const parts = url.parse( req.url, true );
    
    const op = parts.pathname.substr( 1 );
    let { x, y } = parts.query;
    x = parseInt( x );
    y = parseInt( y );

    res.writeHead( 200, {
        'Content-Type': 'text/html'        
    });

    switch( op ) {
        case 'add':
            res.end( x + y + '' );
            break;
        case 'multiply':
            res.end( ( x * y ) + '' );
            break;
        default:
            res.end( 'Unknown operation' )
    }
});

server.on( 'listening', () => {
    console.log( `Started http://localhost:${PORT}` );
});

server.on( 'error', error => {
    console.error( error.message );
});

server.listen( PORT );

