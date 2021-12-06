const mongoose = require( 'mongoose' );
const { logSuccess, logError } = require( '../utils/logger' );

// create the Models
// require( '../models/Time' ); // optional - since Workshop includes it as well
require( '../models/User' );
require( '../models/Workshop' );
require( '../models/Topic' );

const { DB_NAME, DB_HOST, DB_PORT } = process.env;

const connectionStr = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

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