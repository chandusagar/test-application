console.log( '06-a | first line' );

// First time: The exports is noted by Node JS
const b1 = require( './06-b' );

// Second time: Node JS simply returns the exports (does not execute the code in 06-b.js)
const b2 = require( './06-b' );

console.log( 'b1 (within a) = ', b1 );
console.log( 'b2 (within a) = ', b2 );

console.log( '06-a | last line' );