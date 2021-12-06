let john = null; // null is a placeholder for variables that will be assigned an object
console.log( john );
console.log( typeof john ); // 'object' (not an object really)

// later on...
john = {
    name: 'John',
    age: 32
};

let x; // undefined
console.log( x );
console.log( undefined );
console.log( typeof undefined ); // 'undefined'

john = 'I am John';

console.log( john );