// x is a local variable? - YES
if( true ) {
    const x = 1;
    // const y; // error - initial value is a MUST
    
    // x = 2; // error - cannot reassign const variables
}

console.log( x ); // error