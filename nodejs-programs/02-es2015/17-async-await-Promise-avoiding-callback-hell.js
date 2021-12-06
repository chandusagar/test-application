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
const doSerialSums = async () => {
    console.log( 1 );
    
    try {
        // the function volunatarily gives up control when this line executes (it is "paused")
        let result = await sum( 12, 13 );
        console.log( result );

        let result2 = await sum( result, 14 );
        console.log( result2 );

        let result3 = await sum( result2, 15 );
        console.log( result3 );

        return result3;
    } catch( error ) {
        console.log( error.message );
        throw error;
    }
};

doSerialSums()
    .then(result => {
        console.log( 'the final result is ', result );
    })
    .catch(error => {
        console.log( error.message );
    });

console.log( '2. after call to doSerialSums' );