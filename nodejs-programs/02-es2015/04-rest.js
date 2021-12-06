// ... (rest)

// we want to accept extra args passed to a function / collect a set of trailing args into an array
const sum = ( transform, ...args ) => {
    // reduce() of array is helpful here
    let sum = 0;
    
    args.forEach( item => sum += transform( item ) );
    
    return sum;
};

console.log( sum( x => x * x, 12, 13, 14, 15 ) );
console.log( sum( x => x ** 3, 13, 14, 15, 16 ) );
console.log( sum( Math.sqrt, 12, 13, 14, 15, 16, 17 ) );

// array destructuring - to collect the remaining items into an array
const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];
const [ first, second, ...restOfWeekdays ] = weekdays;
console.log( first, second, restOfWeekdays );

// during object destructuring - to collect the remaining key-value pairs into an object
const john = {
    "full name": "John",
    age: 32,
    spouse: "Jane",
    emails: ["john@gmail.com", "john@ness.com"],
    address: {
        city: "Bangalore",
        region: "Koramangala",
    },
};

const { age, address: { city, ...restOfAddress }, ...restOfJohnDetails } = john;
console.log( age, city, restOfJohnDetails, restOfAddress );