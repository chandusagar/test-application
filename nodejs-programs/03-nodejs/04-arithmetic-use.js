// LHS is basically destructuring the module.exports object
const { diff, divide } = require( './04-arithmetic' );

console.log( diff( 12, 13 ) );
console.log( divide( 12, 13 ) );