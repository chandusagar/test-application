// if a function completes execution without an explicit return, it returns undefined
const foo = () => {
    console.log( 'i am foo' );
};

let result = foo();

console.log( result );

const bar = ( x, y ) => x + y;

console.log( bar( 12, 13 ) );

// the third argument is not used - no problem
console.log( bar( 12, 13, 14 ) );
console.log( bar( 12 ) ); // x -> 12, y -> undefined