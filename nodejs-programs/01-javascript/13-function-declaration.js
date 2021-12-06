// syntax 1 - function declaration syntax
// define the function
function sum1( x, y ) {
    let result = x + y;
    return result;
}

let answer = sum1( 12, 13 );
console.log( answer );

// EXERCISE: Q. 11 from docs/lab-guides/01-JS (ES5 and earlier) - Lab guide.pdf
function sumArray( array ) {
    let sum = 0;

    for ( let data = 0; data < array.length; data++) {
        sum += array[data];
    }
    
    return sum;    
}
        
const result = sumArray([1,2,3,4]);
console.log(result);

// syntax 2 - function expression syntax
// the RHS is called a "function expression"
const sum2 = function( x, y ) {
    return x + y;
};

console.log( sum2( 12, 13 ) );

// EXERCISE: Rewrite the above exercise (sumArray) using the function expression syntax
const sumArray2 = function( array ) {
    let sum = 0;

    for ( let data = 0; data < array.length; data++) {
        sum += array[data];
    }
    
    return sum;    
};
        
const result2 = sumArray2([1,2,3,4]);
console.log(result2);

// arrow function syntax (ES2015) - use the => operator after the arguments list
const sum3 = ( x, y ) => {
    return x + y;
};

console.log( sum3( 12, 13 ) );

// EXERCISE: Let's convert sumArray to arrow function syntax and use it
const sumArray3 = ( array ) => {
    let sum = 0;

    for ( let data = 0; data < array.length; data++) {
        sum += array[data];
    }
    
    return sum;    
};
        
const result3 = sumArray3([1,2,3,4]);
console.log(result3);

// function has a single line in function body and that is a return statement...
const sum4 = ( x, y ) => x + y;

console.log( sum4( 12, 13 ) );

// single argument - parentheses around the single argument can be omitted
// const square = ( x ) => x * x;
const square = x => x * x;
console.log( square( 12 ) );

// BREAK till 12