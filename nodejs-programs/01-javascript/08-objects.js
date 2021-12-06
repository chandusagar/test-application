const john = {
    "full name": 'John',
    'age': 32,
    spouse: 'Jane',
    emails: [
        'john@gmail.com',
        'john@ness.com'
    ],
    address: {
        city: 'Bangalore',
        region: 'Koramangala'
    }
};

// Use [] operator with string key, instead of . when accessing properties whose name has special characters
console.log( john["full name"] );
console.log( john.age );
console.log( john["age"] );

john.emails.push( 'john@outlook.com' );
console.log( john.address.city );
john.address.city = 'Chennai';
john.address.region = 'Adyar';
console.log( john );

john.children = [
    'Jack',
    'Jill'
];

// remove a property (with its value)
delete john.age;

console.log( john );
console.log( john?.address?.region?.street.name ); // error
console.log( john?.address?.region?.street?.name ); // avoids the error (?. -> safe navigation operator)