const x = 1, x2 = 10;

function outer() {
    const y = 2;
    const x2 = 100;
    console.log( 'outer x = ', x );
    console.log( 'outer x2 = ', x2 ); // local x2 is used (not global x2)
    console.log( 'outer y = ', y );

    // you can inner within outer
    function inner() {
        const z = 3; // local to inner - cannot be used in outer
        console.log( 'inner y = ', y );
        console.log( 'inner z = ', z );
    }

    inner();
    console.log( 'outer z = ', z );
}

outer();
// inner(); // error - no global function called y
// console.log( 'global y = ', y ); // error - no global called y