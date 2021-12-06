const sum = ( x, y, callback ) => {
    // non-blocking function
    setTimeout(
        () => {
            let result = x + y;
            // return result;
            callback( result );
        },
        3000
    );

    // return undefined;
};

sum( 12, 13, ( result ) => {
    console.log( result );
} );

// Step 1: We need to calculate sum 12, 13
// Step 2: We need to calculate sum previous result, 14
// Step 3: We need to calculate sum previous result, 15
// We end up with the "callback hell"
sum( 12, 13, result => {
    console.log( result );

    sum( result, 14, result2 => {
        console.log( result2 );

        sum( result2, 15, result3 => {
            console.log( result3 );
        });
    });
});