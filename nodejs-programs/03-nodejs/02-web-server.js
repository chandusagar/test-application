// Don't forget to stop (Ctrl + C) and start the server again once you make any change
// import http from 'http';
const http = require( 'http' );

// we need to pass the request handler
// the request handler is called when a request comes from (from a browser)
const server = http.createServer(( req, res ) => {
    res.write( `
        <!doctype html>
        <html>
            <body>
                Hello, Node!
            </body>
        </html>
    ` );
    res.end( 'Bye for now');
});

server.listen( 3000 );