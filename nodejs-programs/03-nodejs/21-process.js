console.log( process.argv );

// a readable list of environment variables
console.log( process.env );

// process.stdin is a read stream
// we read user input, and immediately write back the same to process.stdout
process.stdin.on( 'data', chunk => {
    // process.stdout is a write stream
    process.stdout.write( chunk );
});

// to be sparingly used / not used at all
process.on( 'uncaughtException', ( error ) => {
    console.log( error.message );
});

// error will be thrown as there is no such function
foo();