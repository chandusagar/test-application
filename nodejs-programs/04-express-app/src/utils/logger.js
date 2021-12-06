const chalk = require( 'chalk' );

// ... -> rest (args becomes an array with arguments)
const logError = ( ...args ) => {
    // ... -> spread (spread the items in args as function arguments)
    console.error( chalk.red( ...args ) );
};

const logSuccess = ( ...args ) => {
    console.log( chalk.green( ...args ) );
};

module.exports = {
    logError,
    logSuccess
};