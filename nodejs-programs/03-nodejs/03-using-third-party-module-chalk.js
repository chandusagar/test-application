// import chalk from 'chalk';
const chalk = require( 'chalk' );
const _ = require( 'lodash' );

console.log( chalk.green( 'successfully saved to DB' ) );
console.log( chalk.red( 'could not save to DB' ) );

// EXERCISE: Install lodash and try out any 1 method from it.
// Docs: https://lodash.com/
console.log( _.difference( [2, 1], [2, 3] ) );
// => [1]