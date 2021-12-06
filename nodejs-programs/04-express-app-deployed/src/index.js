// loads the properties from .env file into the environment
require( 'dotenv' ).config();

// this simply runs the connection script
require( './data/init' );

const path = require( 'path' );
const express = require( 'express' );
const { logError, logSuccess } = require( './utils/logger' );
const pageRouter = require( './routes/page' );
const authRouter = require( './routes/auth' );
const workshopsRouter = require( './routes/workshops' );
const topicsRouter = require( './routes/topics' );
const { logger } = require( './middleware/logger' );
const { apiNotSupported, pageNotFound, apiErrorHandler } = require( './middleware/error' );

const app = express();

app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( process.cwd(), 'src/views' ) );

// logger is the 1st function to execute when request comes in
app.use( logger );

// if there is some request body (data sent from client), it wil be available on req.body
app.use( express.json() );

// check for static files in the src/public folder, and serve it if found
app.use( express.static( path.join( process.cwd(), 'src/public' ) ) );

// we add the router to the app using app.use()
app.use( pageRouter );
app.use( '/api/auth', authRouter );
app.use( '/api/workshops', workshopsRouter );
app.use( '/api/topics', topicsRouter );

// NOTE: just to see the working on middleware stack
// app.use( '/api/workshops', ( req, res, next ) => {
//     console.log( 'final middleware' ); // should NOT be called (as the workshopsRouter has handled the request already)
//     next();
// });

app.use( '/api', apiNotSupported );
app.use( pageNotFound );
app.use( '/api', apiErrorHandler );

const PORT = process.env.PORT || 3000;

app.listen( PORT, ( error ) => {
    if( error ) {
        logError( error.message );
        return;
    }

    logSuccess( `Server is running on http://localhost:${PORT}` );
});