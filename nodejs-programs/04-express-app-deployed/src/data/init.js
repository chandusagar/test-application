const mongoose = require( 'mongoose' );
const { logSuccess, logError } = require( '../utils/logger' );

// create the Models
// require( '../models/Time' ); // optional - since Workshop includes it as well
require( '../models/User' );
require( '../models/Workshop' );
require( '../models/Topic' );

let connectionStr;
if( process.env.NODE_ENV !== 'production' ) { 
    const { DB_NAME, DB_HOST, DB_PORT } = process.env;
    connectionStr = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
} else {
    const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
    connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

// update queries will now return the updated data and NOT old data
mongoose.set( 'returnOriginal', false );
mongoose.set( 'runValidators', true );

mongoose.connect( connectionStr )
    .then(() => {
        logSuccess( `connected to db` );
    })
    .catch(error => {
        logError( error.message );
    });