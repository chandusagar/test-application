// an array of command line arguments passed (includes node, the path to the script itself)
console.log( process.argv );

let [ , , op, num1, num2 ] = process.argv;
num1 = parseInt( num1 );
num2 = parseInt( num2 );

if( op === 'add' ) {
    console.log( num1 + num2 );
} else {
    console.log( num1 * num2 );
}
