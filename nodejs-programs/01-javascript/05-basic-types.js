// number, boolean, string

// number
const date = 15, month = 11, monthPassed = 0.5;
console.log( typeof date, typeof monthPassed ); 

// string (backtick-quoted string / template strings are an ES2015 feature)
const greeting1 = 'Hello, world', greeting2 = "Hello, John", greeting3 = `Hello, Jane`;
console.log( greeting1, greeting2, greeting3 );
console.log( greeting1[0] );
console.log( greeting1.length );

// backtick quoted string speciality
const john = {
    name: 'Jonathan',
    age: 32
};

// alternative to concatenating strings using '+'
const welcomeMessage = `
    Hello, ${john.name}
    How are you doing?
`;
console.log( welcomeMessage );
console.log( typeof welcomeMessage );

console.clear();

// boolean
const isRaining = true;
console.log( isRaining );
console.log( typeof isRaining );