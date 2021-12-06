const john = {
    name: 'John',
    age: 32
};

// error
// john = {
//     name: 'Jonathan',
//     age: 32
// };

john.name = 'Jonathan'; // allowed
john.age++;
john.spouse = 'Jane'; // add a new property 'spouse'
console.log( john );

const numbers = [ 10, 20, 30, 40, 50 ];
numbers[0] = 'Ten';
numbers.push( 60 );
console.log( numbers );