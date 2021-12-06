// these enhancements were introduced as part of ES2015
const name = 'John', age = 32, wife = 'Jane', SPOUSE_KEY = 'spouse'; 

// we want to group these values into an object

// left side of key: value (i.e. key is a string)
// right side of key: value (i.e. value is copied from a variable)
const john = {
    name, // name: name,
    age, // age: age,
    [SPOUSE_KEY]: wife
};

console.log( john );