// Let's promisify this function
const sum = ( x, y ) => {
    return new Promise(( resolve, reject ) => {
        // non-blocking function
        setTimeout(
            () => {
                if( typeof x !== 'number' || typeof y !== 'number' ) {
                    reject( new Error( 'both arguments should be numbers' ) );
                    return;
                }

                let result = x + y;
                // return result;
                resolve( result );
            },
            3000
        );
    });
};

sum( 12, 13 )
    .then( ( result ) => { console.log( result ); } )
    .catch( ( error ) => { console.log( error.message ); } )

sum( 12, 'hello' )
    .then( ( result ) => { console.log( result ); } )
    .catch( ( error ) => { console.log( error.message ); } )