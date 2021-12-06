// = operator (Assignment)
let x = 1; // primitive data type
let y = x; // the value in x gets copied to y (copy by value)

y++; // does not affect x

console.log( x, y );

// non-primitives are copied by reference when assigned
const john = {
    name: 'John',
    age: 32
};

const jonathan = john; // john and jonthan are reference to the SAME object in memory (copy by reference)

john.age++;

console.log( john, jonathan );

const numbers = [10, 20, 30 ];
const multiplesOf10 = numbers; // copy by reference - they bith refer to a single array in memory

numbers.push( 40 );
console.log( numbers, multiplesOf10 );

// sum is like a variable that refers to the function in memory
function sum( x, y ) {
    return x + y;
}

const add = sum; // add and sum bith refer to the SAME function in memory

console.log( add( 12, 13 ) );