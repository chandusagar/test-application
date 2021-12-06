// ... (spread)

// array
// copy/concatenate an array into another / send array items as arguments for a function
const numbers1 = [ 10, 20, 30 ], numbers2 = [ 40, 50, 60 ];

// not a new array - both refer to the SAME array in memory
// const numbers1Copy = numbers1;

// in this case we create a new array
// [ numbers[0], numbers[1], numbers[2] ]
// numbers (primitives) are copied by value
const numbers1Copy = [ ...numbers1 ];

numbers1Copy[0]++;

const numbers3 = [ ...numbers1, ...numbers2 ];
console.log( numbers3 );

// one more use for spread operator - to pass items of an array as arguments to a function
console.log( 'max = ', Math.max( ...numbers3 ) );

console.log( numbers1 );
console.log( numbers1Copy );

const persons = [
    { name: 'John', age: 32 },
    { name: 'Jane', age: 28 },
    { name: 'Mark', age: 40 }
];

// we have created a new array
// [ persons[0], persons[1], persons[2] ]
// objects (non-primitives) are copied by reference (shared between the 2 arrays)
const personsCopy = [ ...persons ];
personsCopy[0].age++;
personsCopy.push({ // personsCopy will have 4 objects, but persons will have only 3
    name: 'Mary',
    age: 44
});

console.log( persons );
console.log( personsCopy );

// object
// copy/merge objects
const john = {
    "full name": "John",
    age: 32,
    spouse: "Jane",
    emails: [
        "john@gmail.com",
        "john@ness.com"
    ],
    address: {
        city: "Bangalore",
        region: "Koramangala",
    },
};

const johnEmploymentDetails = {
    company: 'Ness Technologies',
    baseLocation: 'Bangalore'
};

console.clear();

// values that are primtives are copied by value
// values that are non-primtives are copied by reference
const johnCopy = {
    ...john,
    ...johnEmploymentDetails,
    panCard: 'ABCDE1234B',
    'full name': 'Jonathan Doe' // in case of conflict ('full name' comes from multiple sources), last one applies
};

johnCopy.age++;
johnCopy.emails.push( 'john@outlook.com' );

console.log( john );
console.log( johnCopy );

const johnCopy2 = {
    ...john,
    emails: [ // overwriting john.emails with a proper copy
        ...john.emails
    ],
    address: {
        ...john.address
    }
};

johnCopy2.age++;
johnCopy2.emails.push( 'john@yahoo.com' );
johnCopy2.address.city = 'Chennai';
johnCopy2.address.region = 'Adyar';

console.log( john );
console.log( johnCopy2 );