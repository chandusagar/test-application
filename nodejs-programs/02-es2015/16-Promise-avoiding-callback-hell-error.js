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

// Step 1: We need to calculate sum 12, 13
// Step 2: We need to calculate sum previous result, 'hello' -> throws error
// Step 3: We need to calculate sum previous result, 15 (will not execute as previous step fails)
// We end up with the "callback hell"
// We can compare then..catch to a try..catch
sum( 12, 13 )
    .then( result => {
        console.log( result );

        // return 100;
        return sum( result, 'hello' );
    })
    .then( result2 => {
        console.log( result2 );

        return sum( result2, 15 );
    })
    .then( result3 => {
        console.log( result3 );
    })
    .catch(error => {
        console.log( error.message );
    });